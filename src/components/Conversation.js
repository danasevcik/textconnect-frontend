import React, { Component } from "react";
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class Conversation extends Component {

  render() {
    console.log('in conversation', this.props.current_conversation);
    return (
      <div>
      {/* action cable consumer */}
      {this.props.current_conversation && <ActionCableConsumer
        onReceived={(data) => {
          console.log(data)
          this.props.updateConvo(data, this.props)
        }}
        channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}} />}

        {/* TITLE */}
        <h1>{this.props.current_conversation ? this.props.current_conversation.title : 'Conversation'}</h1>

        {/* MESSAGES */}
        {this.props.current_conversation_messages ? this.props.current_conversation_messages.map(message => {
          return <p>{message.content}</p>}) : null}

        {/* MESSAGE FORM */}
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

export default connect(mapStateToProps, actions)(Conversation)
