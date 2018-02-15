import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';

class ResultsList extends Component {
  
  render(){
    return(
      <div>
        ResultsList Component
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user,
    results: state.results
  }
}

export default connect( mapStateToProps, { getUserInfo })( ResultsList );