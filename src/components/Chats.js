import React, { Component } from "react";
import { connect } from 'react-redux';
import ChatSliver from './ChatSliver'
import { updateConvo } from '../actions'

class Chats extends Component {

  render() {
    // map through conversations and render ChatSliver for each
    let conversations = this.props.conversations.map(conversation => {
      return <ChatSliver key={conversation.id} conversation={conversation}/>
    })
    return (
      <div>
        {conversations}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { updateConvo })(Chats)
