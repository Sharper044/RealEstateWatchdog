import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, saveSearch, runSearch, currentSearchUpdater } from '../ducks/reducer';
import Header from './Header';
import SearchTerms from './SearchTerms';
import Footer from './Footer';

class NewSearch extends Component {
  constructor( props ) {
    super( props );
  
    this.state = {
      workingLocation: "",
      workingAmmount: 0,
      workingCashDealTog: 0,
      workingRate: 0,
      workingMoveInTog: 0,
      workingSortBy: 0,
      workingEmailResults: 0
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
      workingLocation: "",
      workingAmmount: 0,
      workingCashDealTog: 0,
      workingRate: 0,
      workingMoveInTog: 0,
      workingSortBy: 0,
      workingEmailResults: 0
    })
  }

  render(){
    return(
      <div className='NewSearch'>
        <Header location='New Search'/>
        <section className='termsHolder components'>
          <SearchTerms handleChange={this.handleChange} state={this.state}/>
        </section>
        <div className='buttonHolder'>
          <button className='searchButton' onClick={ async () => {
            await this.props.saveSearch({
              user_id: this.props.user,
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
            let current = {
              location: this.state.workingLocation,
              ammount: this.state.workingAmmount,
              cash_deal: this.state.workingCashDealTog,
              rate: this.state.workingRate,
              move_in: this.state.workingMoveInTog,
              sort_by: this.state.workingSortBy,
              email: this.state.workingEmailResults
            }
            this.props.currentSearchUpdater(current)
            await this.props.runSearch(current)
            window.location.assign('http://localhost:3000/#/results') }}>Search</button>
          <button className='searchButton resetButton' onClick={ () => this.cancel() }>Reset</button>
        </div>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { getUserInfo, saveSearch, runSearch, currentSearchUpdater })( NewSearch );