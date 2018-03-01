import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserInfo } from '../ducks/reducer';
import Header from './Header';
import Footer from './Footer';
import ResultItem from './ResultItem';
import { Bar } from 'react-chartjs-2';

class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingSortBy: this.props.currentSearch[0].sort_by || 0,
      display: 'block'
    }

    this.handleClick=this.handleClick.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleClick() {
    if (this.state.display === "none") {
      this.setState({ display:"block" });
    } else {
      this.setState({ display:"none" });
    }
  }
  
  handleChange( name, value ) {
    this.setState({
      [ name ]: value
    })
  }

  sendEmail() {
    axios.post('/send_email', {
      sort_by: this.state.workingSortBy,
      user: this.props.user,
      results: this.props.results
    })
  }

  render(){
    let resultItems = this.props.results.data[this.state.workingSortBy].map((x,i) => <ResultItem key={i} index={i+1} result={x}/>);

    let numbers = [], labels = [];
    let strkey = this.state.workingSortBy == 0 ? 'capRate' : this.state.workingSortBy == 1 ? 'cashYield' : 'cashFlow';
    let strLabel = this.state.workingSortBy == 0 ? 'Cap Rate %' : this.state.workingSortBy == 1 ? 'Cash Yield %' : 'Cash Flow $';
    this.props.results.data[this.state.workingSortBy].map((x,i) => {
      numbers.push(x[strkey]);
      labels.push(i+1);
    });

    let data = {
      labels: labels,
      datasets: [
        {
          label: strLabel,
          backgroundColor: 'rgba(147, 179, 238,.8)',
          borderColor: 'rgba(147, 179, 238, 1)',
          pointBackgroundColor: 'rgba(147, 179, 238,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(147, 179, 238,1)',
          data: numbers
        }
      ]
    }

    return(
      <div className='ResultsList'>
        <Header location="Results"/>
        <h5 className='resultsHead'>Your Search Results</h5>
        <div className='autoEmail' style={{display:this.state.display}} ><div>Do you want to have these results emailed to you?</div> <button className='searchButton' onClick={() => {
          this.sendEmail()
          this.handleClick()
        }}>Yes</button><button className='searchButton' onClick={() => this.handleClick()}>No</button></div>
        <div className='resSortBy'>
          Sort by:
          <label htmlFor='SortBy1'> 
          <input type='radio' name='workingSortBy' value={0} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 0 ? true : false}/>  Cap Rate</label>
          <label htmlFor='SortBy1'>
          <input type='radio' name='workingSortBy' value={1} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 1 ? true : false}/> Cash Yield</label>
          <label htmlFor='SortBy1'>
          <input type='radio' name='workingSortBy' value={2} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 2 ? true : false}/> Cash Flow</label>
        </div>
        <Bar data={data}/>
        <p>Select a property to see more details:</p>
        <div>
          {resultItems}
        </div>
        <p className='footnote'>The above stats are calculated on a 30% operating cost assumption.</p>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user,
    results: state.results,
    currentSearch: state.currentSearch
  }
}

export default connect( mapStateToProps, { getUserInfo })( ResultsList );