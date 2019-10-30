import React, { Component } from "react";
import { connect } from 'react-redux';
import ProfileEdit from './ProfileEdit'
import { Grid } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'

class Profile extends Component {

  // local state to toggle rendering profile edit component
  state = {
    clicked: false
  }

  handleClick = e => {
    this.setState({clicked: !this.state.clicked})
  }

  // on submit, hide the edit form
  handleSubmit = e => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    return (
      <Grid id="profile-container" style={{overflow: 'auto', height: 750 }}>
        <Grid.Column width={16}>
            {/* USERNAME */}
            {this.props.user && <h1 style={{fontSize:"50px"}}>Hi, {this.props.user.username}!</h1>}
            <div className="ui equal width grid">

              <div className="row">
                <div className="column">
                  {/* NAME */}
                  {(this.props.user && this.props.user.name) &&
                    <div>
                      <label style={{fontSize:'20px'}}>Name</label>
                      <h2>{this.props.user.name}</h2>
                    </div>
                  }
                </div>
                <div className="column">
                  {/* AGE */}
                  {(this.props.user && this.props.user.age) &&
                    <div>
                      <label style={{fontSize:'20px'}}>Age</label>
                      <h2>{this.props.user.age}</h2>
                    </div>
                  }
                </div>
              </div>

              <div className="row">
                <div className="column">
                  {/* BIO */}
                  {(this.props.user && this.props.user.bio) &&
                    <div>
                      <label style={{fontSize:'20px'}}>Bio</label>
                      <h2>{this.props.user.bio}</h2>
                    </div>
                  }
                </div>
                <div className="column">
                  {/* PHONE NUMBER */}
                  {(this.props.user && this.props.user.phone_number) &&
                    <div>
                      <label style={{fontSize:'20px'}}>Phone Number</label>
                      <h2>{this.props.user.phone_number}</h2>
                    </div>
                  }
                </div>
              </div>

              <div className="row">
                <div className="column">
                  {/* PHOTO */}
                  {(this.props.user && this.props.user.photo) && <img style={{width:"75px"}} src={this.props.user.photo} alt="profile pic"/>}
                </div>
              </div>

              <div className="row">
                <div className="column">
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
              </div>
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
