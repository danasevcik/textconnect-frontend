import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'semantic-ui-react'

class MessageForm extends Component {

  state = {
    message: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.createMessage(this.state, this.props)
    this.setState({
      message: ""
    });
  };

  render() {
    // print message text area form
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="ui category search">
              <input id="message-form"
                className="prompt"
                type="text"
                placeholder="Type Your Message Here..."
                name="message"
                value={this.state.message}
                onChange={this.changeHandler}
                />
              <i aria-hidden="false" className="ellipsis horizontal"></i>
          </div>
          <p></p>
          <Button animated id="send-message-button" onClick={this.submitHandler}>
            <Button.Content visible>Send Message</Button.Content>
            <Button.Content hidden>
              <Icon name='compose' />
            </Button.Content>
          </Button>
          </form>
        </div>
      )
    }
  }



  const mapStateToProps = ({user, token, contacts, conversations, current_conversation_messages, current_conversation_id, current_conversation}) => {
    return {
      user,
      token,
      contacts,
      conversations,
      current_conversation_messages,
      current_conversation_id,
      current_conversation
    }
  }

export default connect(mapStateToProps, actions)(MessageForm)
