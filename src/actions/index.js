import {
  SAY_HI,
  CREATE_USER
} from './types'

const sayHi = () => {
  return {type: SAY_HI, payload: "HI"}
}

export function createUser(userInfo) {
  console.log('in create user', userInfo);
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
        dispatch({type: CREATE_USER, payload: {user: data.user, jwt: data.jwt}})
      })
  }
  // return {type: CREATE_USER, payload: 'hey user'}
}

export default {
  sayHi,
  createUser
}
