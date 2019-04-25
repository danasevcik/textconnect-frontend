import React, { Component } from "react";
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";

class Conversation extends Component {
  render() {
    console.log('in conversation', this.props);
    return (
      <div>
        <h1>{this.props.current_conversation ? this.props.current_conversation.title : 'Conversation'}</h1>
        
      </div>
    )
  }
}

const mapStateToProps = ({user, token, contacts, conversations, current_conversation_messages, current_conversation_id, current_conversation}) => {
  return {
    user,
    token,
    contacts,
    conversations,
    current_conversation_messages,
    current_conversation_id,
    current_conversation
  }
}

export default connect(mapStateToProps)(Conversation)
