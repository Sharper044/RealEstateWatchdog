import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';

class SearchList extends Component {
  
  render(){
    return(
      <div>
        SearchList Component
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { getUserInfo })( SearchList );