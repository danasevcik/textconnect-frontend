import React, { Component } from "react";
import { connect } from 'react-redux';
import Chats from '../components/Chats'
import * as actions from '../actions'
import { Grid, Menu, Segment } from 'semantic-ui-react'

class ChatsContainer extends Component {

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
      <Grid id="chats-container">
        <Grid.Column width={10}>
          <div>
            {(!this.state.haveUserInfo && this.props.user) ? this.getChats() : null}
            <Chats />
          </div>
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
