import React, { Component } from 'react';
import background from '../assets/pexels-photo-280222.jpeg';


class Home extends Component {
  
  render(){
    return(
      <div className='Home'>
        <div className='HomeBackground' style={{backgroundImage: `url(${background})`}}></div>
        <div className='content'>
          <h1>Real Estate Watchdog</h1>
          <h2 className='headerBottom'>Your Real Estate Investment Assistant</h2>
          <a href={process.env.REACT_APP_AUTH}><button className="login">Enter Site</button></a>
        </div>
      </div>
    )
  }
}

export default Home