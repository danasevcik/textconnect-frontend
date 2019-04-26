import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class ProfileEdit extends Component {
  state = {
    name: "",
    age: "",
    bio: "",
    phone_number: "",
    photo: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.props, this.state)
    this.setState({
      name: "",
      age: "",
      bio: "",
      phone_number: "",
      photo: ""
    });
  };

  render() {
    let token = localStorage.getItem("token")
    if (!token) {
      return null
    } else if (!!token) {
      return (
        <div>
          <h1>ProfileEdit</h1>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.changeHandler}
              />
            <input
              type="number"
              placeholder="age"
              name="age"
              value={this.state.age}
              onChange={this.changeHandler}
              />
            <input
              type="text"
              placeholder="bio"
              name="bio"
              value={this.state.bio}
              onChange={this.changeHandler}
              />
            <input
              type="text"
              placeholder="phone number"
              name="phone_number"
              value={this.state.phone_number}
              onChange={this.changeHandler}
              />
            <input
              type="text"
              placeholder="your photo"
              name="photo"
              value={this.state.photo}
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

const mapStateToProps = ({user, token}) => {
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(ProfileEdit)
