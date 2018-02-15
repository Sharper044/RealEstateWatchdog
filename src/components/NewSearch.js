import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';

class NewSearch extends Component {
  constructor( props ) {
    super( props );
  
    this.state = {
      workingLocation: "",
      workingAmmount: 0,
      workingCashDealTog: true,
      workingRate: 0,
      workingMoveInTog: true,
      workingSortBy: 1,
      workingEmailResults: true
    };
  
    // this.saveSearch=this.saveSearch.bind(this);
    // this.handleChange=this.handleChange.bind(this);
  }
  render(){
    return(
      <div>
        NewSearch Component
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user,
    searches: state.searches
  }
}

export default connect( mapStateToProps, { getUserInfo })( NewSearch );