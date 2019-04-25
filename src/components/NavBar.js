import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import ContactContainer from '../containers/ContactContainer'
import AddContactContainer from '../containers/AddContactContainer'
import ChatsContainer from '../containers/ChatsContainer'
import Profile from '../components/Profile'
import Error from '../components/Error'
import * as actions from '../actions'

class NavBar extends Component {

  logout = () => {
    console.log('clicked');
    localStorage.removeItem("token")
    console.log(localStorage);
    this.props.logout()
  }

  render() {
    return (
      <div>
        <h1>NavBar</h1>
        <Link to='/Contacts'>
          Contacts
        </Link>
        <Link to='/Add-Contacts'>
          Add Contacts
        </Link>
        <Link to='/Chats'>
          My Chats
        </Link>
        <Link to='/Profile'>
          My Profile
        </Link>
        <Link to='/' onClick={this.logout}>
          Logout
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({user, token}) => {
  console.log(user);
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(NavBar)
