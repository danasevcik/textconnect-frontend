import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class ContactSliver extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>{this.props.contact.username}</h3>
          <button onClick={() => this.props.startConversation(this.props)}>+Start Conversation</button>
        <button>Remove Friend</button>
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
