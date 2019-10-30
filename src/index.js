import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
// import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider'
import {
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
  REMOVE_FRIEND,
  RENAME_CONVERSATION,
  UNREAD_MESSAGES,
  MARK_AS_READ
} from './actions/types'
import thunk from 'redux-thunk'

// define initial state
const initialState = {user: null, token: null, contacts: [], conversations: [], non_amigas: [], current_conversation_messages: [], unread: []}

// define reducer and pass in the initial state and action
// will get called when an action is dispatched
// switch on action type
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_USER:
      return {...state, user: action.payload.user, token: action.payload.jwt}
    case FIND_USER:
      return {...state, user: action.payload.user, token: action.payload.jwt}
    case GET_USER:
      return {...state, user: action.payload.user, token: action.payload.jwt}
    case LOGOUT:
      return {...state, user: action.payload.user, token: action.payload.jwt}
    case GET_CONTACTS:
      return {...state, contacts: action.payload.contacts}
    case GET_CONVERSATIONS:
      return {...state, conversations: action.payload.conversations}
    case SET_CURRENT_CONVO:
      return {...state, current_conversation_messages: action.payload.messages, current_conversation_id: action.payload.conversation_id, current_conversation: action.payload.conversation}
    case CREATE_MESSAGE:
      return {...state, current_conversation_messages: [...state.current_conversation_messages, {text: action.payload.message}]}
    case UPDATE_CONVO:
      return {...state, current_conversation_messages: [...state.current_conversation_messages, action.payload.message]}
    case FETCH_NON_CONTACTS:
      return {...state, non_amigas: action.payload.non_amigas}
    case ADD_FRIEND:
      return {...state, non_amigas: [...state.non_amigas]}
    case UPDATE_USER:
      return {...state, user: action.payload.user}
    case REMOVE_FRIEND:
      return {...state, contacts: [...state.contacts].filter(contactObj => contactObj.id !== action.payload.amiga.id), non_amigas: [...state.non_amigas, action.payload.amiga]}
    case RENAME_CONVERSATION:
      return {...state, current_conversation: action.payload.conversation.conversation}

    case UNREAD_MESSAGES:
      if (state.unread.length > 0 ) {
        let convoIds = state.unread.map(unreadObj => {
          return unreadObj.conversation.id
        })
        if (convoIds.includes(action.payload.conversation.id)) {
          let unreadArrOfObjects = [...state.unread].map(unreadObj => {
            if (unreadObj.conversation.id === action.payload.conversation.id) {
              let updatedObj = action.payload
              return updatedObj
            } else {
              return unreadObj
            }
          })
          return {
            ...state,
            unread: unreadArrOfObjects
          }
        } else {
          let unread = [...state.unread, {
            user: action.payload.user,
            conversation: action.payload.conversation,
            unread_messages: action.payload.unread_messages
          }]
          return {
            ...state,
            unread
          }
        }
      } else {
        return {...state, unread: [...state.unread, {user: action.payload.user, conversation: action.payload.conversation, unread_messages: action.payload.unread_messages}]}
      }

    case MARK_AS_READ:
      let newStateUnread = [...state.unread].map(unreadObj => {
        if (unreadObj.conversation.id === action.payload.conversation.id) {
          let updatedObj = {...unreadObj, unread_messages: 0}
          return updatedObj
        } else {
          return unreadObj
        }
      })
      return {...state, unread: newStateUnread}

    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={'ws://localhost:3000/cable'}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
