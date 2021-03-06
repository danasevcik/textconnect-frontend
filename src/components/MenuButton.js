import React, { Component } from "react";
import { connect } from 'react-redux';
import NavBar from './NavBar'
import { Grid } from 'semantic-ui-react'

class MenuButton extends Component {

  // local state to toggle navbar
  state = {
    clicked: true
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
              {!!token && <div className="column docs-icon-set-column" onClick={this.handleClick}>
                <i aria-hidden="true" className="align justify big icon">
                </i>
                <p className="name"></p>
              </div>}
            </div>
            {(!!token && this.state.clicked) && <NavBar />}
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
