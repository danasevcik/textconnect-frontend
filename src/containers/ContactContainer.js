import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactBook from '../components/ContactBook'
import * as actions from '../actions'
import { Grid } from 'semantic-ui-react'

class ContactContainer extends Component {

  // local state to indicate whether contacts have been fetched yet
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
      <Grid id="contact-container" style={{overflow: 'auto', height: 750 }}>
        <Grid.Column width={16}>

            {(!this.state.haveUserInfo && this.props.user) && this.getContacts()}
            <ContactBook />

        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ContactContainer)
