import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContactContainer from '../containers/ContactContainer'
import AddContactContainer from '../containers/AddContactContainer'
import ChatsContainer from '../containers/ChatsContainer'
import Profile from '../components/Profile'
import Error from '../components/Error'

class NavBar extends Component {

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
        <Link to='/'>
          Logout
        </Link>
      </div>
    )
  }
}

export default NavBar
