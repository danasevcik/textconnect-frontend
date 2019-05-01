import React, { Component } from "react";
import { connect } from 'react-redux';
import ChatSliver from './ChatSliver'
import { updateConvo } from '../actions'

class Chats extends Component {

  state = {
    searchTerm: ""
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    // map through conversations and render ChatSliver for each
    // check if the search term is included in username
    let conversations = this.props.conversations.map(conversation => {
      if (conversation.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
        return <ChatSliver key={conversation.id} conversation={conversation}/>
      }
    })
    return (
      <div>
        <div>
          <h1>SearchChats</h1>
          <input
            type="text"
            placeholder="search"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.changeHandler}
            />
          </div>
        {conversations}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { updateConvo })(Chats)
