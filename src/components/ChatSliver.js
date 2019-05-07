import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { Button, Icon } from 'semantic-ui-react'

class ChatSliver extends Component {

  state = {
    haveUnreadInfo: false
  }

  getUnreadInProps() {
    // Add unread info to state
    if (this.props.user) {
      this.props.getUnread(this.props.conversation, this.props.user)
    }
    this.setState({
      haveUnreadInfo: true
    })
  }

  render() {
    if (!this.state.haveUnreadInfo && this.props.user) {
      this.getUnreadInProps()
    }
    console.log('CHAT SLIVER PROPS', this.props);
    return (
      <div>
        <div>
          {this.props.user && this.props.user.conversations.map(conversation => {

            return (
              <ActionCableConsumer
                 onReceived={(data) => {
                   this.props.getUnread(conversation, this.props.user)
                   console.log(this.props);
                 }}
                 channel={{channel: 'MessagesChannel', conversation_id: conversation.id}}
               />)
          })}
          <p></p>
          <Link to={`/Conversation/${this.props.conversation.id}`}>
            <Button animated id="conversation-button" onClick={() => this.props.renderConversation(this.props)}>
              <Button.Content visible id="convo-title">{this.props.conversation.title}</Button.Content>
              <Button.Content hidden>
                <Icon name='child' />
                <Icon name='child' />
              </Button.Content>
            </Button>
            <p id="unread">Unread Messages: {(this.props.unread.length > 0 && this.props)
                ? this.props.unread.map(unreadObj => {
                  if (unreadObj.conversation.id === this.props.conversation.id) {
                  return unreadObj.unread_messages
                }
              })
              : 0 }
            </p>
          </Link>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ChatSliver)
