import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

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
          <input
            type="text"
            placeholder="Type your message here..."
            name="message"
            value={this.state.message}
            onChange={this.changeHandler}
            />
          <button onClick={this.submitHandler}>Submit</button>
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
