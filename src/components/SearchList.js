import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getSearches } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SavedSearch from './SavedSearch';

class SearchList extends Component {
  constructor(props){
    super(props);

    this.state = {
      searches: this.props.searches
    }

  }

  async componentDidMount(){
    await this.props.getUserInfo();
    this.props.getSearches({user_id: this.props.user});
  }
  
  render(){
    let searchItems = this.props.searches.map((x, i) => <SavedSearch key={i} search={x} user={this.props.user}/>)
    return(
      <div className='searchList'>
        <Header location='Saved Searches'/>
        <section className='components searchItems'>
          {searchItems}
        </section>
        <Link to='/new_search'><button className='login newSearch'>New Search</button></Link>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user,
    searches: state.searches
  }
}

export default connect( mapStateToProps, { getUserInfo, getSearches })( SearchList );