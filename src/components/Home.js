import React, { Component } from 'react';
import logo from '../assets/watchdog.png';

class Home extends Component {
  
  render(){
    return(
      <div className='Home'>
        <img className='largeLogo' src={logo} alt='Watchdog'/>
        <h1>Real Estate Watchdog</h1>
        <h2 className='headerBottom'>Your Real Estate Investment Assistant</h2>
        <a href='http://localhost:3000/#/about'><button className="login">Enter Site</button></a>
      </div>
    )
  }
}

export default Home