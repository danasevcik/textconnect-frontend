import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'semantic-ui-react'

class ConversationEdit extends Component {

  state = {
    title: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.renameConversation(this.state, this.props)
    this.props.handleSubmit()
    this.setState({
      title: ""
    });
  };

  render() {
    // print conversation title edit form
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div class="ui category search">
              <input id="message-form"
                class="prompt"
                type="text"
                placeholder="Rename Conversation"
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                />
              <i aria-hidden="false" class="ellipsis horizontal"></i>
          </div>
          <p></p>
          <Button animated id="rename-conversation-button" onClick={this.submitHandler}>
            <Button.Content visible>Save These Changes</Button.Content>
            <Button.Content hidden>
              <Icon name='edit' />
            </Button.Content>
          </Button>
          </form>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ConversationEdit)
