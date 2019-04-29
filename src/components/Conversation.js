import React, { Component } from "react";
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class Conversation extends Component {

  handleClick = (messageText) => {
    // text-to-speech audio
    let text = messageText.split(':')
    console.log(text);
    let msg = new SpeechSynthesisUtterance(`${text[1]}`);
    window.speechSynthesis.speak(msg);
    // fetch('http://localhost:3000/api/v1/listen-to-message', {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     accepts: "application/json"
    //   },
    //   body: JSON.stringify({
    //     message: messageText,
    //     user: this.props.user
    //   })
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   console.log(data);
    // })
  }

  render() {
    let date = new Date()
    return (
      <div>
      {/* action cable consumer */}
      {this.props.current_conversation && <ActionCableConsumer
        onReceived={(data) => {
          console.log(data);
          this.props.updateConvo(data, this.props)
          this.props.renderConversation(this.props)
        }}
        channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}} />}

        {/* TITLE */}
        <h1>{this.props.current_conversation && this.props.current_conversation.title}</h1>

        {/* TIME STAMP */}
        <h3>{this.props.current_conversation && date.toDateString() }</h3>

        {/* MESSAGES */}
        {this.props.current_conversation_messages ? this.props.current_conversation_messages.map(message => {
          console.log(message)
          return (
            <div>
                <p>{message}</p>
                <button onClick={() => this.handleClick(message)}>Play</button>
            </div>
          )})
           : null}

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
