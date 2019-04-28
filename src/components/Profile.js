import React, { Component } from "react";
import { connect } from 'react-redux';
import ProfileEdit from './ProfileEdit'
// import { withRouter } from "react-router-dom";

class Profile extends Component {

  state = {
    clicked: false
  }

  handleClick = e => {
    this.setState({clicked: !this.state.clicked})
  }

  handleSubmit = e => {
    console.log('here');
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        {/* USERNAME */}
        {this.props.user && <h1>Hi, {this.props.user.username}!</h1>}
        {/* NAME */}
        {(this.props.user && this.props.user.name) && <h3>Name: {this.props.user.name}</h3>}
        {/* AGE */}
        {(this.props.user && this.props.user.age) && <h3>Age: {this.props.user.age}</h3>}
        {/* BIO */}
        {(this.props.user && this.props.user.bio) && <h3>Bio: {this.props.user.bio}</h3>}
        {/* PHONE NUMBER */}
        {(this.props.user && this.props.user.phone_number) && <h3>Phone Number: {this.props.user.phone_number}</h3>}
        {/* PHOTO */}
        {(this.props.user && this.props.user.photo) && <img src={this.props.user.photo}/>}
        {/* EDIT FORM BUTTON */}
        {this.props.user && <button onClick={() => this.handleClick()}>Edit Profile</button>}
        {/* EDIT FORM RENDER */}
        {(this.props.user && this.state.clicked) && <ProfileEdit handleSubmit={this.handleSubmit}/>}

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
export default connect(mapStateToProps)(Profile)
