import React, { Component } from "react";
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
import * as actions from '../actions'
import ConversationEdit from './ConversationEdit'
import { Grid } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'


class Conversation extends Component {

  // local state to toggle conversation title edit form
  state = {
    renameClicked: false,
    haveUserInfo: false,
    markedAsRead: false
  }

  handleClick = (name, text) => {
    // text-to-speech audio
    if (name === this.props.user.username) {
      let name = 'you'
      let msg = new SpeechSynthesisUtterance(`${name} said ${text}`);
      window.speechSynthesis.speak(msg);
    } else {
      let msg = new SpeechSynthesisUtterance(`${name} said ${text}`);
      window.speechSynthesis.speak(msg);
    }
  }
  
  // toggle conversation rename form
  handleRename = (props) => {
    this.setState({renameClicked: !this.state.renameClicked})
  }

  // toggle conversation rename form
  handleSubmit = e => {
    this.setState({renameClicked: !this.state.renameClicked})
  }

  getConversation() {
    if (this.props.user) {
      let conversationId = this.props.match.params.id
      this.props.renderConversation(this.props, conversationId)
    }
    this.setState({
      haveUserInfo: true
    })
  }

  markAsRead() {
    if (this.props.user) {
      this.props.markAsRead(this.props.current_conversation, this.props.user, this.props.current_conversation_messages)
    }
    this.setState({
      markedAsRead: true
    })
  }

  render() {
    let date = new Date()
    if (this.props.user) {
      let sendMessageButton = document.getElementById('send-message-button')
      // if button exists, scroll it into view
      if (sendMessageButton) {
        sendMessageButton.scrollIntoView()
      }
    }

    return (
      <Grid id="conversation-container" style={{overflow: 'auto', height: 750 }}>
        <Grid.Column width={16}>

          <div>
            {/* GET CONVO ON REFRESH */}
            {(!this.state.haveUserInfo && this.props.user) && this.getConversation()}

            {/* ACTION CABLE CONSUMER */}
            {this.props.current_conversation &&
              (<ActionCableConsumer
              onReceived={(data) => {
                // rerender convo to show most up to date messages
                this.props.renderConversation(this.props)
              }}
              key={this.props.current_conversation.id}

              channel={{channel: 'MessagesChannel', conversation_id: this.props.current_conversation.id}}
              />)
            }
            {/* SEND PATCH REQUEST TO CHANGE ALL CURRENT MESSAGES TO READ */}
            {(this.props.current_conversation && !this.state.markedAsRead) && this.markAsRead()}

            {/* DIV FOR CONVO TITLE, TIME STAMP, AND RENAME BUTTON */}
            <div id="top-of-convo">

            {/* TITLE */}
            <div>
              <h1 id="conversation-title">{this.props.current_conversation && this.props.current_conversation.title}</h1>
            </div>

            {/* TIME STAMP */}
            <div>
              <h3 id="conversation-date">{this.props.current_conversation && date.toDateString() }</h3>
            </div>

            {/* RENAME CONVERSATION TITLE BUTTON */}
            {this.props.current_conversation &&
              <Button animated id="rename-conversation-button" onClick={() => this.handleRename(this.props)}>
                <Button.Content visible>Rename Conversation</Button.Content>
                <Button.Content hidden>
                  <Icon name='edit' />
                </Button.Content>
              </Button>
            }

            {/* RENAME CONVERSATION FORM */}
            {(this.props.current_conversation && this.state.renameClicked) && <ConversationEdit handleSubmit={this.handleSubmit}/>}
            </div>

            {/* MESSAGES */}
            <div id='message-bubbles'>
            {this.props.current_conversation_messages && this.props.current_conversation_messages.map(message => {
              let arr = message.split(":")
              let name = arr[0]
              let text = arr[1]
              return (
                <div id="message-bubble">
                  {this.props.user.username === name ?
                    (
                      <div className="sender-is-current-user">
                        <div id="sender-name">{name.toUpperCase()}:</div>
                        <div id="message-text-container">
                          <div id="message-text">{text}</div>
                        </div>
                        <Button animated id="play-message-button" onClick={() => this.handleClick(name, text)}>
                          <Button.Content visible>
                            <Icon name='play circle'/>
                          </Button.Content>
                          <Button.Content hidden id="play-message-text">Play Message</Button.Content>
                        </Button>
                      </div>

                    )
                  :
                    ( <div className="sender-is-not-current-user">
                        <div id="sender-name">{name.toUpperCase()}:</div>
                        <div id="message-text-container">
                          <div id="message-text">{text}</div>
                        </div>
                        <Button animated id="play-message-button" onClick={() => this.handleClick(name, text)}>
                          <Button.Content visible>
                            <Icon name='play circle'/>
                          </Button.Content>
                          <Button.Content hidden>Play Message</Button.Content>
                        </Button>
                      </div>

                    )
                  }
                </div>
              )})
              }
             </div>
            <p></p>

            {/* MESSAGE FORM */}
            {this.props.current_conversation && <MessageForm conversationId={this.props.current_conversation.id}/>}
          </div>
        </Grid.Column>
      </Grid>
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
