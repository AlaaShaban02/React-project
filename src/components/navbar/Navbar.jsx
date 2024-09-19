import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../index.css'
import logoDark from '../../assets/react-icon-w.png';
import logoLight from '../../assets/react-icon-b.png';
import searchIconLight from '../../assets/search-w.png';
import searchIconDark from '../../assets/search-b.png';
import toggleLight from '../../assets/night-mode.png';
import toggleDark from '../../assets/day.png';


export default function Navbar({theme, setTheme}) {

  const toggle_mode =()=>{
    theme == 'light' ? setTheme('dark'): setTheme('light');
  }


  return (
    
    <div className="navbar">
      
        <img src={theme == 'light' ? logoLight : logoDark} alt='' className="logo"/>
        <h3>React JS App</h3>
    
      
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Logout</li>
      </ul>
      
      <div className="searchBox">
        <input type="text" placeholder='Search'/>
        <img src={theme== 'light' ? searchIconLight : searchIconDark} alt="" />
      </div>

      <img onClick={()=>{toggle_mode()}} src={theme== 'light' ? toggleLight : toggleDark} alt="" className='Toggle-icone' />
    </div>
  );
}
