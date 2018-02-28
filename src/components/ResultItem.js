import React, {Component} from 'react'

class ResultItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'none'
    };

    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.display === "none") {
      this.setState({ display:"block" });
    } else {
      this.setState({ display:"none" });
    }
  }

  render() {
    return(
      <div className='ResultItem' onClick={() => this.handleClick()}>
        <div className='resultHead'>
          <h4> {this.props.index}. {this.props.result.street_number} {this.props.result.street_name} {this.props.result.street_suffix}</h4>
          <h4>{this.props.result.city} {this.props.result.state}, {this.props.result.postal_code}</h4>
          <h4>List Price: ${this.props.result.list_price}</h4>
        </div>
        
        <div style={{display:this.state.display}}>
          <h5>Details:</h5>
          <div className='resultDetails'>
            <p>Monthly Payment: ${this.props.result.payment}</p>
            <p>Rent Zestamate: ${this.props.result.rZestamate}</p>
            <p>Cap Rate: {this.props.result.capRate}%</p>
            <p>Cash Yield: {this.props.result.cashYield}%</p>
            <p>Annual Cash Flow: ${this.props.result.cashFlow}</p>
            <a className='Zillow' href={this.props.result.ZillowLink}><p>See more details for {this.props.result.street_number} {this.props.result.street_name} {this.props.result.street_suffix} on Zillow</p></a>
            <a href='http://www.zillow.com/'><img className='zillowLogo' src={require('../assets/Zillowlogo_200x50.gif')} alt="Real Estate on Zillow"/></a>
          </div>
        </div>
      </div>
    )
  }
}

export default ResultItem