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
  UPDATE_USER
} from './types'

const sayHi = () => {
  return {type: SAY_HI, payload: "HI"}
}

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
          password: userInfo.password
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
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
      if (data.error) {
        console.log(data.error);
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
      console.log(data.conversations);
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
  let token = localStorage.getItem("token");
  let conversation_id = props.conversation.id
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('we have fetched the convo', data);
      dispatch({type: SET_CURRENT_CONVO, payload: {messages: data.messages, conversation_id: data.conversation_id, conversation: data.conversation}})
    })
  }
}

export function createMessage(message, props) {
  console.log(message);
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
          user_id: user_id,
          conversation_id: conversation_id
        }
      })
    })
    // .then(resp => resp.json())
    // .then(message => {
    //   console.log(message);
    //   // force re-render of Conversation component
    //   dispatch({type: CREATE_MESSAGE, payload: {message: message}})
    // })
  }
}

export function updateConvo(data, props) {
  console.log('updating convo data', data);
  console.log('updating convo props', props);
  return dispatch => {
    // Update current_conversation_messages in the store
    dispatch({type: UPDATE_CONVO, payload: {message: data}})
  }
}

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
  console.log(props);
  console.log(userInfo);

  let token = localStorage.getItem("token");
  let id = props.user.id
  // return dispatch => {
  //   fetch(`http://localhost:3000/api/v1/friendships`, {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //       accepts: "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         user_id: id,
  //         amiga_id: nonAmigaId
  //       }
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data);
      // dispatch({type: ADD_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    // })
  // }
}

export default {
  sayHi
}
