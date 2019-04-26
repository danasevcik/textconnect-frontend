import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import * as actions from '../actions'
import Conversation from './Conversation.js'

class ChatSliver extends Component {

  render() {
    console.log('in chat sliver', this.props);
    return (
      <div>
        <div>
          <Link to={`/Conversation/${this.props.conversation.id}`}>
            <button onClick={() => this.props.renderConversation(this.props)}>{this.props.conversation.title}</button>
          </Link>
        </div>
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
