import React, { Component } from "react";
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
import * as actions from '../actions'
import ConversationEdit from './ConversationEdit'

class Conversation extends Component {

  // local state to toggle conversation title edit form
  state = {
    renameClicked: false
  }

  handleClick = (name, text) => {
    // text-to-speech audio
    console.log(name);
    console.log('text', text);
    console.log(this.props.user.username);
    // debugger
    if (name == this.props.user.username) {
      let name = 'you'
      let msg = new SpeechSynthesisUtterance(`${name} said ${text}`);
      window.speechSynthesis.speak(msg);
    } else {
      let msg = new SpeechSynthesisUtterance(`${name} said ${text}`);
      window.speechSynthesis.speak(msg);
    }
  }

  handleRename = (props) => {
    this.setState({renameClicked: !this.state.renameClicked})
  }

  handleSubmit = e => {
    this.setState({renameClicked: !this.state.renameClicked})
  }

  render() {
    let date = new Date()
    return (
      <div>
      {/* action cable consumer */}
      {this.props.current_conversation && <ActionCableConsumer
        onReceived={(data) => {
          this.props.updateConvo(data, this.props)
          this.props.renderConversation(this.props)
        }}
        channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}} />}

        {/* TITLE */}
        <h1>{this.props.current_conversation && this.props.current_conversation.title}</h1>

        {/* RENAME CONVERSATION TITLE BUTTON */}
        {this.props.current_conversation && <button onClick={() => this.handleRename(this.props)}>Rename</button>}

        {/* RENAME CONVERSATION FORM */}
        {(this.props.current_conversation && this.state.renameClicked) && <ConversationEdit handleSubmit={this.handleSubmit}/>}

        {/* TIME STAMP */}
        <h3>{this.props.current_conversation && date.toDateString() }</h3>

        {/* MESSAGES */}
        {this.props.current_conversation_messages ? this.props.current_conversation_messages.map(message => {
          let arr = message.split(":")
          let name = arr[0]
          let text = arr[1]
          return (
            <div>
                <p>{name}:</p>
                <p>{text}</p>
                <button onClick={() => this.handleClick(name, text)}>Play</button>
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
