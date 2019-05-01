import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
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
import FlashMessage from './components/FlashMessage'

class App extends Component {

  state = {
    flash: false,
    message: ""
  }

  componentDidMount() {
    // get user on refresh
    this.props.getUser()
  }

  showMessage = (data) => {
    console.log('HERE', data);
    // maybe fetch to backend to get user who sent this message
    // based on message id
    // maybe show "New Message From 'name'"
    this.setState({flash: true, message: data.content})
  }

  render() {
    console.log(this.state);
    // let conversations = this.props.user
    // define routes
    return (
      <div className="App">
        {this.props.user && this.props.user.conversations.map(conversation => {
          return (<ActionCableConsumer
          onReceived={(data) => {
            this.showMessage(data)
          }}
          channel={{channel: 'MessagesChannel', conversation_id: conversation.id}}
          />)
        })}
        {/*<ActionCableConsumer
        onReceived={(data) => {
          console.log(data.content);
        }}
        channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}}
        />*/}
        {this.state.flash &&
          <FlashMassage duration={3000} persistOnHover={true}>
            <p>{this.state.message}</p>
          </FlashMassage>
        }
        <h1>TEXTCONNECT</h1>
        <Menu />
        <Login />
        <Signup />
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
