import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContact from '../components/AddContact'
import * as actions from '../actions'
import { Grid, Menu, Segment } from 'semantic-ui-react'

class AddContactContainer extends Component {

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
      <Grid id="add-contact-container" style={{overflow: 'auto', height: 488 }}>
        <Grid.Column width={10}>
          <div>
            {(!this.state.haveUserInfo && this.props.user) ? this.getNonContacts() : null}
            <AddContact />
          </div>
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
