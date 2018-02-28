import React from 'react';
import { connect } from 'react-redux';
import { deleteSearch, getSearch, runSearch, currentSearchUpdater } from '../ducks/reducer';

function SavedSearch(props) {
  let loanDetails = <div></div>;

  if(props.search.cash_deal === 0){
    loanDetails = <div><h4>Cash Deal: False</h4><h4>Move In: {props.search.move_in === 0 ? 'False' : 'True' }</h4><h4>Rate: {props.search.rate}%</h4></div>;
  } else {
    loanDetails = <div><h4>Cash Deal: True</h4></div>;
  }

  return(
    <div className='savedSearch'>
      <div>
        <h4>Location: {props.search.location}</h4>
        <h4>Amount: ${props.search.ammount}</h4>
        <h4>Sort By: {(props.search.sort_by === 0)?('Cap Rate'):((props.search.sort_by === 1)?('Cash Yield'):('Cash Flow'))}</h4>
        <h4>Automatic Email: {props.search.email === 0 ? 'False' : 'True' }</h4>
      </div>
      {loanDetails}
      <div className='savedSearchButtons'>
        <button className='savedButton' id="b1" onClick={ async () => {
          let current = {
            location: props.search.location,
            ammount: props.search.ammount,
            cash_deal: props.search.cash_deal,
            rate: props.search.rate,
            move_in: props.search.move_in,
            sort_by: props.search.sort_by,
            email: props.search.email
          }
          props.currentSearchUpdater(current)
          await props.runSearch(current)
          window.location.assign('http://localhost:3000/#/results')
          }}>Run Search</button>
        <button className='savedButton' id="b2" onClick={async () => {
          await props.getSearch({search_id: props.search.id}).then(r => r)
          window.location.assign('http://localhost:3000/#/edit_search')
          }}>Edit Search</button>
        <button className='savedButton' id="b3" onClick={() => props.deleteSearch({search_id: props.search.id, user_id: props.user})}>Delete Search</button>
      </div>
    </div>
  )
}

export default connect( null, { deleteSearch, getSearch, runSearch, currentSearchUpdater })(SavedSearch);