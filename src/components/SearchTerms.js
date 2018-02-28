import React, { Component } from 'react'

class SearchTerms extends Component {
  render(){
    return(
      <div className='SearchTerms'>
        <label htmlFor='workingLocation'>City or Zip Code</label>
        <input type='text' id='workingLocation' value={this.props.state.workingLocation} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
        
        <label htmlFor='workingAmmount'>Cash Amount for Purchase/Down-payment</label>
        <div><input type='text' id='workingAmmount' value={this.props.state.workingAmmount} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/></div>
        
        <label htmlFor='workingCashDealTog'>Are you purchasing the property in a cash deal?</label>
        <div className='switch'>
          <input type='checkbox' id='workingCashDealTog' checked={this.props.state.workingCashDealTog} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
          <span className="slider round"></span>
        </div>

        <div className='loanItems' style={this.props.state.workingCashDealTog == 1 ? {display:"none"} : {display:"flex"}}>
          <label htmlFor='workingRate'>What is your anticipated interest rate? (Annual percent)</label>
          <div><input type='text' id='workingRate' value={this.props.state.workingRate} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/></div>
        
          <label htmlFor='workingMoveInTog'>Will you be moving into the home for a time?</label>
          <div className='switch'>
            <input type='checkbox' id='workingMoveInTog' checked={this.props.state.workingMoveInTog} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value )}/>
            <span className="slider round"></span>
          </div>
        </div>

        <div className='sortBy'>
          Sort results by:
          <label htmlFor='SortBy1'> 
          <input type='radio' name='workingSortBy' value={0} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )} checked={this.props.state.workingSortBy == 0 ? true : false}/>
           Cap Rate</label>
          <label htmlFor='SortBy1'> 
          <input type='radio' name='workingSortBy' value={1} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )} checked={this.props.state.workingSortBy == 1 ? true : false}/>
           Cash Yield</label>
          <label htmlFor='SortBy1'> 
          <input type='radio' name='workingSortBy' value={2} onChange={ (event) => this.props.handleChange( event.target.name, event.target.value )} checked={this.props.state.workingSortBy == 2 ? true : false}/>
           Cash Flow</label>
        </div>
        
        <label htmlFor='workingEmailResults'>Automatic bi-weekly email of current results? (Must save search to take effect.)</label>
        <div className='switch'>
          <input type='checkbox' id='workingEmailResults' checked={this.props.state.workingEmailResults} onChange={ (event) => this.props.handleChange( event.target.id, event.target.value ) }/>
          <span className="slider round"></span>
        </div>

      </div>
    )
  }
}

export default SearchTerms