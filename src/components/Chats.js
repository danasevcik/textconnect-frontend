import React, { Component } from "react";
import { connect } from 'react-redux';
import ChatSliver from './ChatSliver'
// import { withRouter } from "react-router-dom";

class Chats extends Component {

  render() {
    let conversations = this.props.conversations.map(conversation => {
      return <ChatSliver key={conversation.id} conversation={conversation}/>
    })
    return (
      <div>
        <h1>Chats</h1>
        {conversations}
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

export default connect(mapStateToProps)(Chats)
