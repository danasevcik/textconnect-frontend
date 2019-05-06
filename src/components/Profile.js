import React, { Component } from "react";
import { connect } from 'react-redux';
import ProfileEdit from './ProfileEdit'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'

class Profile extends Component {

  state = {
    clicked: false
  }

  handleClick = e => {
    this.setState({clicked: !this.state.clicked})
  }

  handleSubmit = e => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    return (
      <Grid id="profile-container" style={{overflow: 'auto', height: 488 }}>
        <Grid.Column width={10}>
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
            {(this.props.user && this.props.user.photo) && <img src={this.props.user.photo} alt="profile pic"/>}
            {/* EDIT FORM BUTTON */}
            {this.props.user &&
              <Button animated id="edit-profile-button" onClick={() => this.handleClick()}>
                <Button.Content hidden>
                  <Icon name='edit'/>
                </Button.Content>
                <Button.Content visible>Edit Profile</Button.Content>
              </Button>
            }
            {/* EDIT FORM RENDER */}
            {(this.props.user && this.state.clicked) && <ProfileEdit handleSubmit={this.handleSubmit}/>}

          </div>
        </Grid.Column>
      </Grid>
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
