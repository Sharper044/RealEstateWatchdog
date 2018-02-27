import React from 'react';
import { connect } from 'react-redux';
import { deleteSearch, getSearch, runSearch, currentSearchUpdater } from '../ducks/reducer';

function SavedSearch(props) {
  let loanDetails = <div></div>;

  if(props.search.cash_deal === 0){
    loanDetails = <div><p>Cash Deal: False</p><p>Move In: {props.search.move_in === 0 ? 'False' : 'True' }</p><p>Rate: {props.search.rate}%</p></div>;
  } else {
    loanDetails = <div><p>Cash Deal: True</p></div>;
  }

  return(
    <div>
      <div>
        <p>Location: {props.search.location}</p>
        <p>Amount: ${props.search.ammount}</p>
        <p>Sort By: {(props.search.sort_by === 0)?('Cap Rate'):((props.search.sort_by === 1)?('Cash Yield'):('Cash Flow'))}</p>
        <p>Email Results: {props.search.email === 0 ? 'False' : 'True' }</p>
      </div>
      {loanDetails}
      <div>
        <button onClick={ async () => {
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
        <button onClick={async () => {
          await props.getSearch({search_id: props.search.id}).then(r => r)
          window.location.assign('http://localhost:3000/#/edit_search')
          }}>Edit Search</button>
        <button onClick={() => props.deleteSearch({search_id: props.search.id, user_id: props.user})}>Delete Search</button>
      </div>
    </div>
  )
}

export default connect( null, { deleteSearch, getSearch, runSearch, currentSearchUpdater })(SavedSearch);