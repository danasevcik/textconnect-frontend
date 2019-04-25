import React, { Component } from "react";
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";

class ContactSliver extends Component {
  render() {
    console.log('IN SLIVER', this.props.contact);
    return (
      <div>
        <h1>ContactSliver</h1>
        <h3>{this.props.contact.username}</h3>
        <button>+Start Conversation</button>
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

export default connect(mapStateToProps)(ContactSliver)
