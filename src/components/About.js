import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import Header from './Header';
import logo from '../assets/watchdog.png';
import Footer from './Footer';
 
class About extends Component {

  componentDidMount(){
    this.props.getUserInfo();
  }

  render(){
    return(
      <div className='About'>
        <Header location="About" />
        <img className='largeLogo aboutLogo' src={logo} alt='Watchdog'/>
        <h2>Welcome,</h2>
        <p className='aboutText'>to Real Estate Watchdog, your real estate investment assistant. To begin now, press "New Search" below or "Saved Searches" in the menu.</p>
        <Link to='/new_search'><button className='login newSearch'>New Search</button></Link>
        <h2>About:</h2>
        <p className='aboutText'>This tool is designed to help you in your quest to reach financial independence through real estate. One of the most time consuming aspects of real estate investment is selecting which properties to purchase, which it should be. This is your financial future you are deciding. But wouldn't it be great if there was a tool who could help you in the selection process? Now there is with the R.E. Watchdog!</p>
        <p className='aboutText'>What the R.E. Watchdog does is take in a few pieces of information, like where you want to buy, how much you plan on putting towards the purchase, etc., and then runs a full sweep of every house on the market in your budget. Then, with the help of Zillow's rent Zestimate, it compares each of those homes and finds the top ten based on cash flow, cash yield, and cap rate. from there you can see further details on the property by going to the link provided. Finding a new investment has never been easier.</p>
        <p className='aboutText'>Best of all, once a search is saved, our watchdog will run that search twice a month for you automatically. It will then email you the results of that search, effortlessly getting you the data you need to make the best investment choices possible. We hope you enjoy using the Real Estate Watchdog.</p>
        <h2>Note:</h2>
        <p className='aboutText aboutEnd'>This product is currently in a prototype/demo mode. It uses a hard-coded database of properties and does not have access to homes currently on the market. The code is in place to do this, but to access the retaliator API requires a $500/yr fee. Further, Zillow's API only allows for 1000 pings per day, and they have structured it to only allow one house to be pinged at a time. With time, and some investment, we plan to create our own comp/rent estimate algorithm, at which point this will be a fully functional commercial product.</p>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUserInfo})(About);