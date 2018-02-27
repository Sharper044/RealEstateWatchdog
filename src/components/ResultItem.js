import React from 'react'

export default function ResultItem(props) {
  return(
    <div>
      <div>
        <h4>{props.index}. {props.result.street_number} {props.result.street_name} {props.result.street_suffix}, {props.result.city} {props.result.state}, {props.result.postal_code} List Price: ${props.result.list_price}</h4>
      </div>
      <div>
        <h5>Details</h5>
        <p>Monthly Payment: ${props.result.payment}</p>
        <p>Rent Zestamate: ${props.result.payment}</p>
        <p>Cap Rate: {props.result.capRate}%</p>
        <p>Cash Yield: {props.result.cashYield}%</p>
        <p>Anual Cash Flow: ${props.result.cashFlow}</p>
        <p>The above stats are calculated on a 30% opperating cost assumption.</p>
        <a href={props.result.ZillowLink}><p>See property on Zillow</p></a>
      </div>
    </div>
  )
}