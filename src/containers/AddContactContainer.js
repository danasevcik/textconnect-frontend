import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContact from '../components/AddContact'
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class AddContactContainer extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchNonContacts(this.props)
    }
  }

  render() {
    return (
      <div>
        <h1>AddContactContainer</h1>
        <AddContact />
      </div>
    )
  }
}

const mapStateToProps = ({user, token, contacts, conversations, non_amigas}) => {
  return {
    user,
    token,
    contacts,
    conversations,
    non_amigas
  }
}

export default connect(mapStateToProps, actions)(AddContactContainer)
