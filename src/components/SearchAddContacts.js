import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

class SearchAddContacts extends Component {

  // local state for search term
  state = {
    searchTerm: ""
  };

  // on change, call handleChange in add contact component
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.handleChange(this.state.searchTerm)
  };

  render() {
    // print profile edit form
    return (
      <div>
        <h1>SearchAddContacts</h1>
        <input
          type="text"
          placeholder="search"
          name="searchTerm"
          value={this.state.searchTerm}
          onChange={this.changeHandler}
          />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(SearchAddContacts)
