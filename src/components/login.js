import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.findUser(this.state)
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        <button onClick={
            this.submitHandler
          }>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user, token}) => {
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(Login)
