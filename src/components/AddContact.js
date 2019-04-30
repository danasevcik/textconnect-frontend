import React, { Component } from "react";
import { connect } from 'react-redux';
import AddContactSliver from './AddContactSliver'

class AddContact extends Component {

  render() {
    // map through "non-amigas" and render AddContactSliver for each
    let non_amigas = this.props.non_amigas.map(non_amiga => {
      return <AddContactSliver key={non_amiga.id} non_amiga={non_amiga}/>
    })
    return (
      <div>
        {non_amigas}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AddContact)
