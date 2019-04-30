import React, { Component } from "react";
import { connect } from 'react-redux';
import Chats from '../components/Chats'
import * as actions from '../actions'

class ChatsContainer extends Component {
  
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchConversations(this.props)
    }
  }

  render() {
    return (
      <div>
        <Chats />
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

export default connect(mapStateToProps, actions)(ChatsContainer)
