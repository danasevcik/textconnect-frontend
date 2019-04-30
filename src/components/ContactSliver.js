import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

class ContactSliver extends Component {

  render() {
    // print username, start conversation button, and remove friend button for each contact
    return (
      <div>
        <h3>{this.props.contact.username}</h3>
          <button onClick={() => this.props.startConversation(this.props)}>+Start Conversation</button>
          <button onClick={() => this.props.removeFriend(this.props, this.props.contact)}>Remove Friend</button>
      </div>
    )
  }
}

const mapStateToProps = ({user, token, contacts}) => {
  return {
    user,
    token,
    contacts
  }
}

export default connect(mapStateToProps, actions)(ContactSliver)
