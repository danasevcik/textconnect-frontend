import React, { Component } from "react";
import { connect } from 'react-redux';
import NavBar from './NavBar'

class Menu extends Component {

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
    let token = localStorage.getItem("token")
    return (
      <div>
        {!!token ? <button onClick={this.handleClick}>Menu</button> : null}
        {(!!token && this.state.clicked) ? <NavBar /> : null}
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

export default connect(mapStateToProps)(Menu)
