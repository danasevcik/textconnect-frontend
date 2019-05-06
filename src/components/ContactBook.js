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
        <h1>Contact Book</h1>
        <div class="ui category search">
          <div class="ui icon input">
            <input
              class="prompt"
              type="text"
              placeholder="Search Contacts"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.changeHandler}
              />
            <i aria-hidden="true" class="search icon"></i>
          </div>
          {contacts}
        </div>
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
