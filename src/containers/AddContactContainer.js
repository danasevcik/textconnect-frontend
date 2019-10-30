import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContact from '../components/AddContact'
import * as actions from '../actions'
import { Grid } from 'semantic-ui-react'

class AddContactContainer extends Component {

  // local state to indicate whether non-contacts have been fetched yet
  state = {
    haveUserInfo: false
  }

  getNonContacts() {
    if (this.props.user) {
      this.props.fetchNonContacts(this.props)
    }
    this.setState({
      haveUserInfo: true
    })
  }

  render() {
    return (
      <Grid id="add-contact-container" style={{overflow: 'auto', height: 750 }}>
        <Grid.Column width={16}>
            {(!this.state.haveUserInfo && this.props.user) && this.getNonContacts()}
            <AddContact />
        </Grid.Column>
      </Grid>
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
