import React, { Component } from "react";
// import FlashMassage from 'react-flash-message';

class FlashMessage extends Component {

  componentDidMount() {
    console.log('here');
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default FlashMessage
