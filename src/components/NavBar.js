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
      <div>
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
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(NavBar)
