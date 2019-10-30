import {
  CREATE_USER,
  FIND_USER,
  GET_USER,
  LOGOUT,
  GET_CONTACTS,
  GET_CONVERSATIONS,
  SET_CURRENT_CONVO,
  UPDATE_CONVO,
  FETCH_NON_CONTACTS,
  ADD_FRIEND,
  UPDATE_USER,
  REMOVE_FRIEND,
  RENAME_CONVERSATION,
  UNREAD_MESSAGES,
  MARK_AS_READ
} from './types'

// CREATE A USER WITH USERNAME, PASSWORD AND LANGUAGE
export function createUser(userInfo) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userInfo.username,
          password: userInfo.password,
          language: userInfo.language
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.jwt);
        dispatch({type: CREATE_USER, payload: {user: data.user, jwt: data.jwt}})
      }
    })
  }
}

// FIND A USER (CALLED FROM LOGIN)
export function findUser(userInfo) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userInfo.username,
          password: userInfo.password
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.jwt);
        dispatch({type: FIND_USER, payload: {user: data.user, jwt: data.jwt}})
      }
    })
  }
}

// GET USER (CALLED ON REFRESH)
export function getUser() {
  return dispatch => {
    let token = localStorage.getItem("token");
    if (!!token) {
      fetch("http://localhost:3000/api/v1/get_user", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: GET_USER, payload: {user: data.user, jwt: localStorage.token}})
      });
    } else {
      console.log('no token');
    }
  }
}

// LOGOUT (CALLED FROM CLICK ON NAV BAR LOGOUT)
export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT, payload: {user: null, jwt: localStorage.token}})
  }
}

// FETCH CONTACTS (CALLED FROM CLICK ON NAV BAR CONTACTS) ALPHABETICAL ORDER
export function fetchContacts(props) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: GET_CONTACTS, payload: {contacts: data.amigas}})
    })
  }
}

// FETCH CONVERSATIONS (CALLED FROM CLICK ON NAV BAR CHATS) ALPHABETICAL ORDER
export function fetchConversations(props) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: GET_CONVERSATIONS, payload: {conversations: data.conversations}})
    })
  }
}

// CREATE CONVERSATION - USERCONVERSATION + CONVERSATION (CALLED FROM CONTACT SLIVER)
export function startConversation(props) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch('http://localhost:3000/api/v1/user_conversations', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          user_id: id,
          amiga_id: props.contact.id
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data);
    })
  }
}

// RENDER CONVO AND SET CURRENT CONVO/MESSAGES
export function renderConversation(props, conversationId) {
  let token = localStorage.getItem("token");
  // if props.conversation exists, fetch to conversation id and set current convo
  if (props.conversation) {
    let conversation_id = props.conversation.id
    let id = props.user.id
    return dispatch => {
      return fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            user_id: id
          }
        })
      })
      .then(resp => resp.json())
      .then(data => {
        return dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
        // window.location.reload()
      })
    }
    // return;
  } else if (props.current_conversation_id) {
    // otherwise, if current conversation id exists, fetch based on url
    let id = props.user.id
    return dispatch => {
      return fetch(`http://localhost:3000/api/v1/conversations/${props.match.params.id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            user_id: id
          }
        })
      })
      .then(resp => resp.json())
      .then(data => {
        return dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
        // window.location.reload()
      })
    }
  }
  // RENDER CONVO ON REFRESH
  else {
    let id = props.user.id
    return dispatch => {
      return fetch(`http://localhost:3000/api/v1/conversations/${conversationId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            user_id: id
          }
        })
      })
      .then(resp => resp.json())
      .then(data => {
        return dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
      })
    }
  }
}

export function renderConvoMaybeItWillWork() {

}

// CREATE MESSAGE AND PERSIST IN DB
export function createMessage(message, props) {
  let token = localStorage.getItem("token");
  let user_id = props.user.id
  let conversation_id = props.conversationId
  return dispatch => {
    fetch('http://localhost:3000/api/v1/messages', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content: message.message,
          user_name: props.user.name,
          user_id: user_id,
          conversation_id: conversation_id
        }
      })
    })
    .then(resp => resp.json())
    .then(message => {
      // console.log(message);
      // dont have to force re-render of Conversation component b/c action cable unsubscribe fix
      // dispatch({type: CREATE_MESSAGE, payload: {message: message.content}})
    })
  }
}

// UPDATE CONVERSATION MESSAGES
export function updateConvo(data, props) {
  return dispatch => {
    // Update current_conversation_messages in the store
    dispatch({type: UPDATE_CONVO, payload: {message: data.content}})
  }
}

// FETCH USERS IN THE DB THAT THE CURRENT USER IS NOT FRIENDS WITH
export function fetchNonContacts(props) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/add-contacts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          user_id: id
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: FETCH_NON_CONTACTS, payload: {non_amigas: data.non_amigas}})
    })
  }
}

// ADD A FRIEND AND CREATE FRIENDSHIP INSTANCE (CALLED FROM ADD CONTACT SLIVER)
export function addFriend(props, nonAmigaId) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/friendships`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          user_id: id,
          amiga_id: nonAmigaId
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: ADD_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    })
  }
}

// UPDATE USER ATTRIBUTES (CALLED FROM PROFILE EDIT)
export function updateUser(props, userInfo) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          name: userInfo.name,
          age: userInfo.age,
          bio: userInfo.bio,
          phone_number: userInfo.phone_number,
          photo: userInfo.photo
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: UPDATE_USER, payload: {user: data}})
    })
  }
}

// REMOVE FRIEND (CALLED FROM CONTACT SLIVER)
export function removeFriend(props, contact) {
  let token = localStorage.getItem("token");
  let id = props.user.id
  // send to custom route instead of delete :id since we don't have friendship id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/remove-friend`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          user_id: id,
          amiga_id: contact.id
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: REMOVE_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    })
  }
}

// RENAME CONVERSATION AND SEND PATCH TO CONVERSATIONS/:ID
export function renameConversation(title, props) {
  let token = localStorage.getItem("token");
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/conversations/${props.current_conversation_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        id: props.current_conversation_id
      })
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: RENAME_CONVERSATION, payload: {conversation: data}})
    })
  }
}

// GET UNREAD MESSAGES FOR EACH CONVO (CALLED FROM CHAT SLIVER)
export function getUnread(conversation, user) {
  // console.log('how many times is this called');
  let token = localStorage.getItem("token");
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/get-unread-messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        conversation: conversation,
        user: user
      })
    })
    .then(resp => resp.json())
    .then(unread_messages => {
      // debugger
      dispatch({type: UNREAD_MESSAGES, payload: {conversation: conversation, user: user, unread_messages: unread_messages}})
    })
  }
}

// MARK MESSAGES AS READ (CALLED WHEN CHAT OPENS)
export function markAsRead(conversation, user, messages) {
  let token = localStorage.getItem("token");
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/mark-as-read`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        conversation: conversation,
        user: user,
        messages: messages
      })
    })
    .then(resp => resp.json())
    .then(unread_messages => {
      // console.log(unread_messages);
      dispatch({type: MARK_AS_READ, payload: {conversation: conversation, user: user, unread_messages: unread_messages}})
    })
  }
}
