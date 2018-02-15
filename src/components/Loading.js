import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateResults } from '../ducks/reducer';

class Loading extends Component {
  
  render(){
    return(
      <div>
        Loading Component
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    stateItem: state.stateItem
  }
}

export default connect( mapStateToProps, { updateResults })( Loading );