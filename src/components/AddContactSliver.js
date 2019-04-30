import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

class AddContactSliver extends Component {

  addFriend = (props, nonAmigaId) => {
    // post to /friendships and create friendship
    let token = localStorage.getItem("token");
    let id = props.user.id
    fetch(`http://localhost:3000/api/v1/friendships`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          user_id: id,
          amiga_id: nonAmigaId
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.fetchNonContacts(this.props)
    })
  }

  render() {
    // print username and add friend button for each
    return (
      <div>
        <h3>{this.props.non_amiga.username}</h3>
        <button onClick={() => this.addFriend(this.props, this.props.non_amiga.id)}>+Add Friend</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(AddContactSliver)
