import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

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
          <input
            type="title"
            placeholder="title"
            name="title"
            value={this.state.title}
            onChange={this.changeHandler}
            />
          <button onClick={
              this.submitHandler
            }>Save These Changes</button>
          </form>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ConversationEdit)
