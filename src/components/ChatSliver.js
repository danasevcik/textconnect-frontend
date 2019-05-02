import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../actions'

class ChatSliver extends Component {

  state = {
    haveUnreadInfo: false
  }

  getUnreadInProps() {
    console.log('in get unread');
    console.log('this.props.user', this.props.user);
    if (this.props.user) {
      this.props.getUnread(this.props.conversation, this.props.user)
    }
    this.setState({
      haveUnreadInfo: true
    })
  }

  render() {
    console.log('haveUnreadInfo', this.state.haveUnreadInfo);
    console.log('this.props', this.props);

    // print button with link conversation for each chat
    return (
      <div>
        <div>
          <Link to={`/Conversation/${this.props.conversation.id}`}>
            {(!this.state.haveUnreadInfo && this.props.user) ? this.getUnreadInProps() : null}
            <button onClick={() => this.props.renderConversation(this.props)}>{this.props.conversation.title}</button>
            <p>Unread Messages: {this.props.unread ? this.props.unread.map(unreadObj => {
                if (unreadObj.conversation.id === this.props.conversation.id) {
                  return unreadObj.unread_messages
                }
              }) : null }</p>
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
