import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactBook from '../components/ContactBook'
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class ContactContainer extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchContacts(this.props)
    }
  }

  render() {
    return (
      <div>
        <h1>ContactContainer</h1>
        <ContactBook />
      </div>
    )
  }
}

const mapStateToProps = ({user, token, contacts}) => {
  return {
    user,
    token,
    contacts
  }
}

export default connect(mapStateToProps, actions)(ContactContainer)
