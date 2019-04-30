import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContact from '../components/AddContact'
import * as actions from '../actions'

class AddContactContainer extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchNonContacts(this.props)
    }
  }

  render() {
    return (
      <div>
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
