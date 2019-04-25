import React, { Component } from "react";
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
// import { withRouter } from "react-router-dom";

class Conversation extends Component {
  render() {
    console.log('in conversation', this.props);
    return (
      <div>
      {this.props.current_conversation && <ActionCableConsumer
        onReceived={(data) => console.log('working', data)}
        channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}} />}
        <h1>{this.props.current_conversation ? this.props.current_conversation.title : 'Conversation'}</h1>
        {this.props.current_conversation_messages ? this.props.current_conversation_messages.map(message => {
          return <p>{message.content}</p>}) : null}
        {this.props.current_conversation ? <MessageForm conversationId={this.props.current_conversation.id}/> : null}
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
