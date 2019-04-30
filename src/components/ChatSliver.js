import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions'

class ChatSliver extends Component {

  render() {
    // print button with link conversation for each chat
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
