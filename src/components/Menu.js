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
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleClick}>Menu</button>
        {this.state.clicked ? <NavBar /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({user, token}) => {
  console.log('in map state to props menu');
  return {
    user,
    token
  }
}

export default connect(mapStateToProps)(Menu)
