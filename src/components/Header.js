import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/watchdog.png';
import menu from '../assets/menu.png';

class Header extends Component {
  constructor( props ) {
    super( props );
  
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
  
  render(){
    return(
      <div className='Header'>
        <div className='upperDiv'>
          <img className="logo" src={ logo } alt='Real Estate Watchdog'/>
          <h2 className='title'>{ this.props.location }</h2>
          <img className="menuIcon" src={ menu } alt='menu' onClick={() => this.handleClick()}/>
        </div>
        <nav className='desktopNav' id='nav' style={{display:this.state.display}}>
          <ul className='menu'>
            <li><Link className='link' to="/about">About</Link></li>
            <li><Link className='link' to="/new_search">New Search</Link></li>
            <li><Link className='link' to="/saved_searches">Saved Searches</Link></li>
            <li><Link className='link' to="/results">Results</Link></li>
            <li><a href={'http://localhost:3000/#/'}>Logout</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header