import React, { Component } from "react";
import { connect } from 'react-redux';
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
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: 'dana',
          password: 'hi'
        }
      })
    })
      .then(r => r.json())
      .then(console.log)
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
        <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (whatIsThis) => {
  console.log(whatIsThis);
  return {name: 'xavier'}
}

export default connect(mapStateToProps)(Signup)
