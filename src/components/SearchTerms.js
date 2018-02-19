import React, { Component } from 'react'

class SearchTerms extends Component {
  render(){
    return(
      <div className='SearchTerms'>
        <label htmlFor='workingLocation'>City or Zip Code</label>
        <input type='text' id='workingLocation' value={this.props.state.workingLocation} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
        
        <label htmlFor='workingAmmount'>Cash Ammount for Purchase/Downpayment</label>
        <input type='text' id='workingAmmount' value={this.props.state.workingAmmount} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
        
        <label htmlFor='workingCashDealTog'>Are you purchasing the property in a cash deal?</label>
        <div className='switch'>
          <input type='checkbox' id='workingCashDealTog' checked={this.props.state.workingCashDealTog} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
          <span className="slider round"></span>
        </div>

        <label htmlFor='workingRate'>What is your anticipated inerest rate? (Anual percent)</label>
        <input type='text' id='workingRate' value={this.props.state.workingRate} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
        
        <label htmlFor='workingMoveInTog'>Will you be moving into the home for a time?</label>
        <div className='switch'>
          <input type='checkbox' id='workingMoveInTog' checked={this.props.state.workingMoveInTog} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
          <span className="slider round"></span>
        </div>

        <div>
          Sort results by:
          <label htmlFor='SortBy1'>Cap Rate 
          <input type='radio' name='workingSortBy' value={0} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )} checked="checked"/>
          </label>
          <label htmlFor='SortBy1'>Cash Yield 
          <input type='radio' name='workingSortBy' value={1} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )}/>
          </label>
          <label htmlFor='SortBy1'>Cash Flow 
          <input type='radio' name='workingSortBy' value={2} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )} />
          </label>
        </div>
        
        <label htmlFor='workingEmailResults'>Do you want an email sent of the results?</label>
        <div className='switch'>
          <input type='checkbox' id='workingEmailResults' checked={this.props.state.workingEmailResults} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value ) }/>
          <span className="slider round"></span>
        </div>

      </div>
    )
  }
}

export default SearchTerms