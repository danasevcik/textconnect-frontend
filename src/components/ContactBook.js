import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactSliver from './ContactSliver'

class ContactBook extends Component {

  render() {
    // map through "amigas" and render ContactSliver for each
    let contacts = this.props.contacts.map(contact => {
      return <ContactSliver key={contact.id} contact={contact}/>
    })
    return (
      <div>
        {contacts}
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

export default connect(mapStateToProps)(ContactBook)
