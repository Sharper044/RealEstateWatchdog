import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserInfo } from '../ducks/reducer';
import Header from './Header';
import ResultItem from './ResultItem';
import { Bar } from 'react-chartjs-2';

class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingSortBy: this.props.currentSearch[0].sort_by || 0
    }

    this.handleChange=this.handleChange.bind(this);
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
    this.props.results.data[this.state.workingSortBy].map((x,i) => {
      numbers.push(x[strkey]);
      labels.push(i+1);
    });

    let data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(10, 88, 167,0.2)',
          borderColor: 'rgba(143, 143, 238,1)',
          pointBackgroundColor: 'rgba(10, 88, 167,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(143, 143, 238,1)',
          data: numbers
        }
      ]
    }

    return(
      <div>
        <Header location="Results"/>
        <h5>Your Search Results</h5>
        <div>Do you want to have these results emailed to you? <button onClick={() => this.sendEmail()}>Yes</button><button>No</button></div>
        <div>
          Sort by:
          <label htmlFor='SortBy1'>Cap Rate 
          <input type='radio' name='workingSortBy' value={0} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 0 ? true : false}/>
          </label>
          <label htmlFor='SortBy1'>Cash Yield 
          <input type='radio' name='workingSortBy' value={1} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 1 ? true : false}/>
          </label>
          <label htmlFor='SortBy1'>Cash Flow 
          <input type='radio' name='workingSortBy' value={2} onChange={ (event) => this.handleChange( event.target.name, event.target.value )} checked={this.state.workingSortBy == 2 ? true : false}/>
          </label>
        </div>
        <Bar data={data} />
        <div>
          {resultItems}
        </div>
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