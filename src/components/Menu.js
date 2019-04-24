import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from './NavBar'

class Menu extends Component {

  state = {
    clicked: false
  }

  handleClick = (e) => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Menu</button>
        {this.state.clicked ? <NavBar /> : null}
      </div>
    )
  }
}

export default Menu
