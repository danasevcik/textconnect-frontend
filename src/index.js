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
import { SAY_HI } from './actions/types'
import thunk from 'redux-thunk'

const initialState = {name: 'Dana'}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SAY_HI:
      return {...state, greeting: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={'ws://localhost:3001/cable'}>
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
