import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContactSliver from './AddContactSliver'
import SearchAddContacts from './SearchAddContacts'

class AddContact extends Component {

  state = {
    searchTerm: ""
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    // map through "non-amigas" and render AddContactSliver for each
    // check if the search term is included in username
    let non_amigas = this.props.non_amigas.map(non_amiga => {
      if (non_amiga.username.includes(this.state.searchTerm)) {
        return <AddContactSliver key={non_amiga.id} non_amiga={non_amiga}/>
      }
    })
    return (
      <div>
        <h1>Add Friends</h1>
        <div class="ui category search">
          <div class="ui icon input">
            <input
              class="prompt"
              type="text"
              placeholder="Search For Friends"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.changeHandler}
              />
            <i aria-hidden="true" class="search icon"></i>
          </div>
          {non_amigas}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AddContact)
