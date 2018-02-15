import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import SearchTerms from './SearchTerms';

class EditSearch extends Component {
  constructor( props ) {
    super( props );
  
    this.state = {
      workingLocation: this.props.searches[this.props.searchId].location,
      workingAmmount: this.props.searches[this.props.searchId].ammount,
      workingCashDealTog: this.props.searches[this.props.searchId].cashDeal,
      workingRate: this.props.searches[this.props.searchId].rate,
      workingMoveInTog: this.props.searches[this.props.searchId].moveIn,
      workingSortBy: this.props.searches[this.props.searchId].sortBy,
      workingEmailResults: this.props.searches[this.props.searchId].emailResults
    };
  
    this.saveSearch=this.saveSearch.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  render(){
    return(
      <div>
        EditSearch Component
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

export default connect( mapStateToProps, { getUserInfo })( EditSearch );