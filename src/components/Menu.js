import React, { Component } from "react";
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";
import NavBar from './NavBar'

class Menu extends Component {

  state = {
    clicked: false
  }

  handleClick = (e) => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
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
