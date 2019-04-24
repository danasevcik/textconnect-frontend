import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Menu from './components/Menu.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Profile from './components/Profile.js'
import Error from './components/Error.js'
import ContactContainer from './containers/ContactContainer'
import AddContactContainer from './containers/AddContactContainer'
import ChatsContainer from './containers/ChatsContainer'
import { connect } from 'react-redux';
import * as actions from './actions'

class App extends Component {

  componentDidMount() {
    console.log(this.props.getUser);
    this.props.getUser()
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1>HELLO WORLD</h1>
        <Menu />
        <Login />
        <Signup />
        <Switch>
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

const mapStateToProps = ({user, token}) => {
  console.log('in map state to props');
  return {
    user,
    token
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
