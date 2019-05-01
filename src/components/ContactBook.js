import React, { Component } from "react";
import { connect } from 'react-redux';
import ContactSliver from './ContactSliver'

class ContactBook extends Component {

  state = {
    searchTerm: ""
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    // map through "amigas" and render ContactSliver for each
    // check if the search term is included in username
    let contacts = this.props.contacts.map(contact => {
      if (contact.username.includes(this.state.searchTerm)) {
        return <ContactSliver key={contact.id} contact={contact}/>
      }
    })
    return (
      <div>
        <div>
          <h1>SearchContacts</h1>
          <input
            type="text"
            placeholder="search"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.changeHandler}
            />
          </div>
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
