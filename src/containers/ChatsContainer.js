import React, { Component } from "react";
import { connect } from 'react-redux';
import Chats from '../components/Chats'
import * as actions from '../actions'
import { Grid } from 'semantic-ui-react'

class ChatsContainer extends Component {

  // local state to indicate whether conversations have been fetched yet
  state = {
    haveUserInfo: false
  }

  getChats() {
    if (this.props.user) {
      this.props.fetchConversations(this.props)
    }
    this.setState({
      haveUserInfo: true
    })
  }

  render() {
    return (
      <Grid id="chats-container" style={{overflow: 'auto', height: 750 }}>
        <Grid.Column width={16}>
          {(!this.state.haveUserInfo && this.props.user) && this.getChats()}
          <Chats />
        </Grid.Column>
      </Grid>
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
