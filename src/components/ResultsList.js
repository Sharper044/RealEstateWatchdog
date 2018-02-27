import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import Header from './Header';
import ResultItem from './ResultItem';

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

  render(){
    let resultItems = this.props.results.data[this.state.workingSortBy].map((x,i) => <ResultItem key={i} result={x}/>);
    return(
      <div>
        <Header location="Results"/>
        <h5>Your Search Results</h5>
        <div>Do you want to have these results emailed to you? <button>Yes</button><button>No</button></div>
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
        <div>Chart Div</div>
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