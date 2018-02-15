import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
import logo from '../assets/watchdog.png';
 
class About extends Component {
  
  render(){
    return(
      <div className='About'>
        <Header location="About" />
        <img className='largeLogo aboutLogo' src={logo} alt='Watchdog'/>
        <h2>Welcome,</h2>
        <p className='aboutText'>to Real Estate Watchdog, your real estate investment assistant. To begin now, press "New Search" below or "Saved Searches" in the menu.</p>
       <Link to='/new_search'><button className='login newSearch'>New Search</button></Link>
       <p className='aboutText'>This tool is designed to help you in your quest to reach financial independence through real estate. One of the most time consuming aspects of real estate investment is selecting which properties to purchase, which it should be. This is your financial future you are deciding. But wouldn't it be great if there was a tool who could help you in the selection process? Now there is with the R.E. Watchdog!</p>
       <p className='aboutText'>What the R.E. Watchdog does is take in information on where you want to buy, how much you plan on putting towards the purchase, and a couple other small questions about the purchase (like if you plan to move in for a time), and then runs a full sweep of every house on the market in your budget. Then, with the help of Zillow's rent Zestimate, it compares each of those homes and finds the top ten based on cash flow, cash yield, and cap rate. from there you can see further details on the property by going to the link provided. Finding a new investment has never been easier.</p>
       <p className='aboutText'>Best of all, once a search is saved, our watchdog will run that search once a week for you automatically. It will then email you the results of that search, effortlessly getting you the data you need to make the best investment choices possible. We hope you enjoy using the Real Estate Watchdog.</p>

      </div>
    )
  }
}

export default About