import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoDark from '../../assets/logo-b.png';
import logoLight from '../../assets/logo-b.png';
import searchIconLight from '../../assets/search-w.png';
import searchIconDark from '../../assets/search-b.png';
import toggleLight from '../../assets/night-mode.png';
import toggleDark from '../../assets/day.png';


export default function Navbar() {
  return (
    
    <div className="navbar">
      
        <img src={logoLight} alt='' className="logo"/>
        <h3>React JS App</h3>
    
      
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Logout</li>
      </ul>
      
      <div className="searchBox">
        <input type="text" placeholder='Search'/>
        <img src={searchIconLight} alt="" />
      </div>

      <img src={toggleLight} alt="" className='Toggle-icone' />
    </div>
  );
}
