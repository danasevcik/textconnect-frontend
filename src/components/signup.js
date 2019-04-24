import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class Signup extends Component {
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
    // fetch('http://localhost:3000/api/v1/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       username: this.state.username,
    //       password: this.state.password
    //     }
    //   })
    // })
    //   .then(r => r.json())
    //   .then(console.log)
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Signup</h1>
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
        <button onClick={() => this.props.createUser(this.state)}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user, token}) => {
  console.log('in map state to props');
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(Signup)
