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
    console.log(this.props);
    // print button with link conversation for each chat
    return (
      <div>
        <div>
          <Link to={`/Conversation/${this.props.conversation.id}`}>
            {(!this.state.haveUnreadInfo && this.props.user) ? this.getUnreadInProps() : null}
            <button onClick={() => this.props.renderConversation(this.props)}>{this.props.conversation.title}</button>
            <p>Unread Messages: {this.props.unread.length > 0 ? this.props.unread.map(unreadObj => {
                console.log('each unread object', unreadObj);
                console.log('props', this.props);
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
