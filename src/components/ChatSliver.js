import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class ChatSliver extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>ChatSliver</h1>
        <button onClick={() => this.props.renderConversation(this.props)}>{this.props.conversation.title}</button>
      </div>
    )
  }
}

const mapStateToProps = ({user, token, contacts, conversations}) => {
  return {
    user,
    token,
    contacts,
    conversations
  }
}

export default connect(mapStateToProps, actions)(ChatSliver)
