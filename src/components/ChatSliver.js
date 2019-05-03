import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions'

class ChatSliver extends Component {

  state = {
    haveUnreadInfo: false
  }

  getUnreadInProps() {
    if (this.props.user) {
      this.props.getUnread(this.props.conversation, this.props.user)
    }
    this.setState({
      haveUnreadInfo: true
    })
  }

  render() {
    console.log('now what is in props?', this.props);

    if (!this.state.haveUnreadInfo && this.props.user) {
      this.getUnreadInProps()
    }
    return (
      <div>
        <div>
          <Link to={`/Conversation/${this.props.conversation.id}`}>
            <button onClick={() => this.props.renderConversation(this.props)}>{this.props.conversation.title}</button>
            <p>Unread Messages: {(this.props.unread.length > 0 && this.props) ? this.props.unread.map(unreadObj => {
                  if (unreadObj.conversation.id === this.props.conversation.id) {
                  return unreadObj.unread_messages
                }
              }) : 0 }</p>
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
