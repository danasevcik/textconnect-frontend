import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

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
    let token = localStorage.getItem("token")
    if (!token) {
      return null
    } else if (!!token) {
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
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ConversationEdit)
