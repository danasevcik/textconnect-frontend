import {
  SAY_HI,
  CREATE_USER,
  FIND_USER,
  GET_USER,
  LOGOUT,
  GET_CONTACTS,
  GET_CONVERSATIONS,
  SET_CURRENT_CONVO,
  CREATE_MESSAGE,
  UPDATE_CONVO,
  FETCH_NON_CONTACTS,
  ADD_FRIEND,
  UPDATE_USER,
  REMOVE_FRIEND
} from './types'

const sayHi = () => {
  return {type: SAY_HI, payload: "HI"}
}

export function createUser(userInfo) {
  console.log('before fetch in create user', userInfo);
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
      console.log('after post in create user', data.user);
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.jwt);
        dispatch({type: CREATE_USER, payload: {user: data.user, jwt: data.jwt}})
      }
    })
  }
}

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
      console.log(data);
      if (data.message) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.jwt);
        dispatch({type: FIND_USER, payload: {user: data.user, jwt: data.jwt}})
      }
    })
  }
}

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
        console.log(data);
        dispatch({type: GET_USER, payload: {user: data.user, jwt: localStorage.token}})
      });
    } else {
      console.log('no token');
    }
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT, payload: {user: null, jwt: localStorage.token}})
  }
}

export function fetchContacts(props) {
  console.log('in fetch contacts');
  console.log(props.user);
  let token = localStorage.getItem("token");
  console.log(token);
  let id = props.user.id
  console.log(id);
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
      console.log(data.amigas);
      dispatch({type: GET_CONTACTS, payload: {contacts: data.amigas}})
    })
  }
}

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
      console.log(data);
    })
  }
}

export function renderConversation(props) {
  console.log('RENDER CONVO ACTION', props)
  let token = localStorage.getItem("token");
  // debugger
  if (props.conversation) {
    let conversation_id = props.conversation.id
    let id = props.user.id
    return dispatch => {
      fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`, {
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
        console.log(data);
        dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
      })
    }
  } else if (props.current_conversation_id) {
    let conversation_id = props.current_conversation_id
    let id = props.user.id
    return dispatch => {
      fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`, {
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
        console.log(data);
        dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
      })
    }
  }
  // else if (typeof conversation_id === 'string') {
  //   console.log('here');
  //   let conversation_id = conversation_id
  //   return dispatch => {
  //     fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         accepts: "application/json",
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           user_id: id
  //         }
  //       })
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data);
  //       dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
  //     })
  //   }
  // }
  }



export function createMessage(message, props) {
  console.log(message);
  console.log('props', props);
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
      console.log(message);
      // force re-render of Conversation component
      // dispatch({type: CREATE_MESSAGE, payload: {message: message.content}})
    })
  }
}

export function updateConvo(data, props) {
  console.log('updating convo data', data.content);
  console.log('updating convo props', props);
  return dispatch => {
    // Update current_conversation_messages in the store
    dispatch({type: UPDATE_CONVO, payload: {message: data.content}})
  }
}

export function fetchNonContacts(props) {
  console.log('in fetch non contacts', props);
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
      console.log(data);
      dispatch({type: FETCH_NON_CONTACTS, payload: {non_amigas: data.non_amigas}})
    })
  }
}

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
      console.log(data);
      dispatch({type: ADD_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    })
  }
}

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
      console.log(data);
      dispatch({type: UPDATE_USER, payload: {user: data}})
    })
  }
}

export function removeFriend(props, contact) {
  console.log(props);
  console.log(contact);
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
      console.log(data);
      dispatch({type: REMOVE_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    })
  }

}

export default {
  sayHi
}
