import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from "react-router-dom";
import './App.css';
import Menu from './components/Menu.js'
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
// import FlashMessage from './components/FlashMessage'

class App extends Component {

  state = {
    flash: false,
    user: "",
    conversation: ""
  }

  componentDidMount() {
    // get user on refresh
    this.props.getUser()
  }

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
    console.log('in app', this.props);
    return (
      <div className="App">

        {/* ACTION CABLE CONSUMER FOR EVERY CONVO THAT THIS USER HAS */}
        {this.props.user && this.props.user.conversations.map(conversation => {

          return (
            <ActionCableConsumer
               onReceived={(data) => {
                 this.showMessage(data, conversation)
                 console.log(this.props);
               }}
               channel={{channel: 'MessagesChannel', conversation_id: conversation.id}}
             />)
        })}

        <h1>TEXTCONNECT</h1>

        {/* FLASH MESSAGE AND LINK TO CONVO */}
        {this.state.flash &&
          <Link to={`/Conversation/${this.state.conversation.id}`}>
            <FlashMassage duration={3000} persistOnHover={true}>
              <p onClick={() => this.props.renderConversation(this.props)}>NEW MESSAGE FROM {this.state.user.toUpperCase()}</p>
            </FlashMassage>
          </Link>
        }

        <Menu />
        <Login />
        <Signup />

        {/* ROUTES */}
        <Switch>
          <Route
            path='/Conversation/:id'
            render={(routerProps) => <Conversation {...routerProps}/>}
          />
          <Route
            path='/Login'
            render={() => <Login />}
          />
          <Route
            path='/Signup'
            render={() => <Signup />}
          />
          <Route
            path='/Contacts'
            render={() => <ContactContainer />}
          />
          <Route
            path='/Add-Contacts'
            render={() => <AddContactContainer />}
          />
          <Route
            path='/Chats'
            render={() => <ChatsContainer />}
          />
          <Route
            path='/Profile'
            render={() => <Profile />}
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

export default withRouter(connect(mapStateToProps, actions)(App));
