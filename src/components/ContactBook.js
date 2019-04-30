import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactSliver from './ContactSliver'
// import { withRouter } from "react-router-dom";

class ContactBook extends Component {

  render() {
    console.log(this.props);
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
