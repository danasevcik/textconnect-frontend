import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'semantic-ui-react'

class ContactSliver extends Component {

  render() {
    // print username, start conversation button, and remove friend button for each contact
    return (
      <div>
        <h3 id="contact-username">{this.props.contact.username}</h3>
          <Button animated id="start-conversation-button" onClick={() => this.props.startConversation(this.props)}>
            <Button.Content visible>Start Conversation</Button.Content>
            <Button.Content hidden>
              <Icon name='plus' />
            </Button.Content>
          </Button>
          <p></p>
          <Button animated id="start-conversation-button" onClick={() => this.props.removeFriend(this.props, this.props.contact)}>
            <Button.Content visible>Remove Friend</Button.Content>
            <Button.Content hidden>
              <Icon name='minus' />
            </Button.Content>
          </Button>
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
