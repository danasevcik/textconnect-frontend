import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

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
    // if there is no token, show login form
    let token = localStorage.getItem("token")
    if (!!token) {
      return null
    } else if (!token) {
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={this.submitHandler} class="ui small form">
            <div class="equal width fields">
              <div class="field">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  />
              </div>
              <div class="field">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  />
              </div>
            </div>
            <button class="ui button" onClick={
                this.submitHandler
              }>Submit</button>
            </form>
          </div>
        )

    }
  }
}

const mapStateToProps = ({user, token}) => {
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(Login)
