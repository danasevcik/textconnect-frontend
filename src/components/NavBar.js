import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions'

class NavBar extends Component {

  logout = () => {
    localStorage.removeItem("token")
    this.props.logout()
  }

  render() {
    // print links to each route
    return (
      <div id="nav-bar">
        <div id="contacts-nav-bar">
          <Link to='/Contacts'>
            Contacts
          </Link>
        </div>
        <div id="add-contacts-nav-bar">
          <Link to='/Add-Contacts'>
            Add Contacts
          </Link>
        </div>
        <div id="chats-nav-bar">
          <Link to='/Chats'>
            My Chats
          </Link>
        </div>
        <div id="profile-nav-bar">
          <Link to='/Profile'>
            My Profile
          </Link>
        </div>
        <div id="logout-nav-bar">
          <Link to='/' onClick={this.logout}>
            Logout
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user, token}) => {
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(NavBar)
