import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfo, updateSearch, runSearch } from '../ducks/reducer';
import SearchTerms from './SearchTerms';
import Header from './Header';

class EditSearch extends Component {
  constructor( props ) {
    super( props );
  
    this.state = {
      search_id: this.props.currentSearch[0].search_id,
      workingLocation: this.props.currentSearch[0].location,
      workingAmmount: this.props.currentSearch[0].ammount,
      workingCashDealTog: this.props.currentSearch[0].cash_deal,
      workingRate: this.props.currentSearch[0].rate,
      workingMoveInTog: this.props.currentSearch[0].move_in,
      workingSortBy: this.props.currentSearch[0].sort_by,
      workingEmailResults: this.props.currentSearch[0].email
    };
  
    this.handleChange=this.handleChange.bind(this);
    this.cancel=this.cancel.bind(this);
  }

  componentDidMount(){
    this.props.getUserInfo();
  }

  handleChange( name, value ) {
    if( name === 'workingMoveInTog' || name === 'workingCashDealTog' || name === 'workingEmailResults' ) {
      if ( this.state[name] === 0 ){
        this.setState({
          [ name ]: 1
        })
      }
      else {
        this.setState({
          [ name ]: 0
        })
      }
    }
    else{
      this.setState({
        [ name ]: value
      })
    }
  }

  cancel(){
    this.setState({
      search_id: this.props.currentSearch[0].search_id,
      workingLocation: this.props.currentSearch[0].location,
      workingAmmount: this.props.currentSearch[0].ammount,
      workingCashDealTog: this.props.currentSearch[0].cash_deal,
      workingRate: this.props.currentSearch[0].rate,
      workingMoveInTog: this.props.currentSearch[0].move_in,
      workingSortBy: this.props.currentSearch[0].sort_by,
      workingEmailResults: this.props.currentSearch[0].email
    })
  }

  render(){
    return(
      <div className='NewSearch'>
        <Header location='Edit Search'/>
        <section className='termsHolder'>
          <SearchTerms handleChange={this.handleChange} state={this.state}/>
        </section>
        <div className='buttonHolder'>
          <button className='searchButton' onClick={ () => {
            this.props.updateSearch({
              user_id: this.props.user,
              search_id: this.props.currentSearch[0].id,
              location: this.state.workingLocation,
              ammount: this.state.workingAmmount,
              cash_deal: this.state.workingCashDealTog,
              rate: this.state.workingRate,
              move_in: this.state.workingMoveInTog,
              sort_by: this.state.workingSortBy,
              email: this.state.workingEmailResults
            })
            window.location.replace('http://localhost:3000/#/saved_searches')
          }}>Save</button>
          <button className='searchButton' onClick={ async () => {
            await this.props.runSearch({
              location: this.state.workingLocation,
              ammount: this.state.workingAmmount,
              cash_deal: this.state.workingCashDealTog,
              rate: this.state.workingRate,
              move_in: this.state.workingMoveInTog,
              sort_by: this.state.workingSortBy,
              email: this.state.workingEmailResults
            }) 
            window.location.assign('http://localhost:3000/#/results')
          }}>Search</button>
          <button className='searchButton' onClick={ () => this.cancel() }>Reset</button>
          <Link to="/saved_searches"><button>Back To Saved Searches</button></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user,
    searches: state.searches,
    currentSearch: state.currentSearch
  }
}

export default connect( mapStateToProps, { getUserInfo, updateSearch, runSearch })( EditSearch );