import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'semantic-ui-react'

class ConversationEdit extends Component {

  // controlled form for title name
  state = {
    title: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // on submit, call rename conversation
  // reset form to clear search term
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
          <div className="ui category search">
              <input id="message-form"
                className="prompt"
                type="text"
                placeholder="Rename Conversation"
                name="title"
                value={this.state.title}
                onChange={this.changeHandler}
                />
              <i aria-hidden="false" className="ellipsis horizontal"></i>
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
