import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from "react-router-dom";
import './App.css';
import MenuButton from './components/MenuButton.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Profile from './components/Profile.js'
import Error from './components/Error.js'
import Conversation from './components/Conversation.js'
import ContactContainer from './containers/ContactContainer'
import AddContactContainer from './containers/AddContactContainer'
import ChatsContainer from './containers/ChatsContainer'
import { connect } from 'react-redux';
import * as actions from './actions'
import FlashMassage from 'react-flash-message';
import { ActionCableConsumer } from 'react-actioncable-provider'
import { Grid, Segment } from 'semantic-ui-react'

class App extends Component {

  // local state to flash incoming message
  state = {
    flash: false,
    user: "",
    conversation: ""
  }

  componentDidMount() {
    // get user on refresh
    this.props.getUser()
  }

  // function to show flash message
  showMessage = (data, conversation) => {
    // fetch to backend to get the user who sent the message
    // set state in order to trigger render
    let token = localStorage.getItem("token");
    fetch('http://localhost:3000/api/v1/message-author', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: data
      })
    })
    .then(resp => resp.json())
    .then(user => {
      if (user.username !== this.props.user.username) {
        this.setState({flash: true, user: user.username, conversation: conversation})
      }
    })
    .then(this.setState({flash: false, user: "", conversation: ""}))
  }

  render() {
    let token = localStorage.getItem("token")

    return (
      <div className="App">

        {/* ACTION CABLE CONSUMER FOR EVERY CONVO THAT THIS USER HAS
          every time a message is received, showMessage will be called
         */}
        {this.props.user && this.props.user.conversations.map(conversation => {

          return (
            <ActionCableConsumer
               onReceived={(data) => {
                 this.showMessage(data, conversation)
               }}
               key={conversation.id}
               channel={{channel: 'MessagesChannel', conversation_id: conversation.id}}
             />)
        })}

        <span>
          <h1 id="header">
            WELCOME TO TEXT CONNECT
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png" id="start-img" alt="start-img"></img>
          </h1>
        </span>

        {/* FLASH MESSAGE if flash in state is true */}
        {this.state.flash &&
          <FlashMassage duration={5000} persistOnHover={true}>
            <p id="flash-message">NEW MESSAGE FROM {this.state.user.toUpperCase()}</p>
          </FlashMassage>
        }

        <MenuButton />
        {/* If there is no token, show login or signup page */}
        {!token &&
          <div>
            <Segment style={{opacity:"0.8"}} id="login-singup">
              <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                  <Login />
                </Grid.Column>
                <Grid.Column>
                  <Signup />
                </Grid.Column>
              </Grid>
              {/*<Divider vertical>Or</Divider>*/}
            </Segment>
          </div>
        }

        {/* ROUTES */}
        <Switch>
            <Route
              path='/Conversation/:id'
              component={Conversation}
              />
            <Route
              path='/Login'
              component={Login}
              />
            <Route
              path='/Signup'
              component={Signup}
              />
            <Route
              path='/Contacts'
              component={ContactContainer}
              />
            <Route
              path='/Add-Contacts'
              component={AddContactContainer}
              />
            <Route
              path='/Chats'
              component={ChatsContainer}
              />
            <Route
              path='/Profile'
              component={Profile}
              />
          <Route
            path='/'
            render={() => <Error />}
          />
        </Switch>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return state
}

// inject everything from actions folder
export default withRouter(connect(mapStateToProps, actions)(App));
