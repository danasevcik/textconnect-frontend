import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactBook from '../components/ContactBook'
import * as actions from '../actions'

class ContactContainer extends Component {

  state = {
    haveUserInfo: false
  }

  getContacts() {
    if (this.props.user) {
      this.props.fetchContacts(this.props)
    }
    this.setState({
      haveUserInfo: true
    })
  }

  render() {
    return (
      <div>
        {(!this.state.haveUserInfo && this.props.user) ? this.getContacts() : null}
        <ContactBook />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ContactContainer)
