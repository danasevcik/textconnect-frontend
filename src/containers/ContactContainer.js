import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactBook from '../components/ContactBook'
import * as actions from '../actions'

class ContactContainer extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchContacts(this.props)
    }
  }

  render() {
    return (
      <div>
        <ContactBook />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ContactContainer)
