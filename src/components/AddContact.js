import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContactSliver from './AddContactSliver'
import SearchAddContacts from './SearchAddContacts'

class AddContact extends Component {

  state = {
    searchTerm: ""
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state.searchTerm));
  };

  render() {
    // map through "non-amigas" and render AddContactSliver for each
    let non_amigas = this.props.non_amigas.map(non_amiga => {
      if (non_amiga.username.includes(this.state.searchTerm)) {
        return <AddContactSliver key={non_amiga.id} non_amiga={non_amiga}/>
      }
    })
    return (
      <div>
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
        {non_amigas}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AddContact)
