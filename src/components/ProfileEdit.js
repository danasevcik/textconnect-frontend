import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Button, Icon } from 'semantic-ui-react'

class ProfileEdit extends Component {

  state = {
    name: this.props.user.name,
    age: this.props.user.age,
    bio: this.props.user.bio,
    phone_number: this.props.user.phone_number,
    photo: this.props.user.photo
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.props, this.state)
    this.props.handleSubmit(e)
    this.setState({
      name: this.props.user.name,
      age: this.props.user.age,
      bio: this.props.user.bio,
      phone_number: this.props.user.phone_number,
      photo: this.props.user.photo
    });
  };

  render() {
    // print profile edit form
    return (
      <div>
        <form className="ui form" onSubmit={this.submitHandler}>
          <div className="fields">
            <div className="ten wide field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.changeHandler}
                />
            </div>
            <div className="six wide field">
              <label>Age</label>
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={this.state.age}
                onChange={this.changeHandler}
                />
            </div>
          </div>
          <div className="fields">
            <div className="sixteen wide field">
              <label>Bio</label>
              <input
                type="text"
                placeholder="Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.changeHandler}
                />
            </div>
          </div>
          <div className="fields">
            <div className="eight wide field">
              <label>Phone Numer</label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                value={this.state.phone_number}
                onChange={this.changeHandler}
                />
            </div>
            <div className="eight wide field">
              <label>Photo</label>
              <input
                type="text"
                placeholder="Your Photo"
                name="photo"
                value={this.state.photo}
                onChange={this.changeHandler}
                />
            </div>
          </div>
          <Button animated id="save-edits-profile-button" onClick={this.submitHandler}>
            <Button.Content hidden>
              <Icon name='edit'/>
            </Button.Content>
            <Button.Content visible>Save These Changes</Button.Content>
          </Button>
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

export default connect(mapStateToProps, actions)(ProfileEdit)
