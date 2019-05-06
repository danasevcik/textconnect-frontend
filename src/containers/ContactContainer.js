import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactBook from '../components/ContactBook'
import * as actions from '../actions'
import { Grid, Menu, Segment } from 'semantic-ui-react'

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
      <Grid id="contact-container" style={{overflow: 'auto', height: 488 }}>
        <Grid.Column width={10}>
          <div>
            {(!this.state.haveUserInfo && this.props.user) ? this.getContacts() : null}
            <ContactBook />
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(ContactContainer)
