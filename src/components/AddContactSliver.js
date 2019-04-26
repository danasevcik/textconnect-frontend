import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { withRouter } from "react-router-dom";

class AddContactSliver extends Component {

  addFriend = (props, nonAmigaId) => {
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
      console.log(data);
      console.log(this.props);
      this.props.fetchNonContacts(this.props)
      // dispatch({type: ADD_FRIEND, payload: {amiga: data.amiga, friendship: data.friendship}})
    })
  }

  render() {
    console.log(this.props);
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
