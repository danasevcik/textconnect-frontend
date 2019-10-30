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
        <h1>Search Chats</h1>
        <div className="ui category search">
          <div className="ui icon input">
            <input id="search-chats"
              className="prompt"
              type="text"
              placeholder="Search Chats"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.changeHandler}
              />
            <i aria-hidden="true" className="search icon"></i>
          </div>
          {conversations}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { updateConvo })(Chats)
