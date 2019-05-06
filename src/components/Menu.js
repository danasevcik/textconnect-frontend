import React, { Component } from "react";
import { connect } from 'react-redux';
import NavBar from './NavBar'
import { Grid, Menu, Segment } from 'semantic-ui-react'

class MenuButton extends Component {

  // local state to toggle navbar
  state = {
    clicked: false
  }

  handleClick = (e) => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    // if there is a token, show menu button
    // if there is a token and menu is clicked, show nav bar
    // align justify icon
    let token = localStorage.getItem("token")
    return (
      <Grid>
        <Grid.Column width={3}>
            <div id="menu">
              {!!token && <div class="column docs-icon-set-column" onClick={this.handleClick}>
                <i aria-hidden="true" class="align justify big icon">
                </i>
                <p class="name"></p>
              </div>}
            </div>
            {(!!token && this.state.clicked) ? <NavBar /> : null}
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

export default connect(mapStateToProps)(MenuButton)
