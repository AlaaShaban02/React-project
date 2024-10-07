import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import '../../index.css';
import logoDark from '../../assets/react-icon-w.png';
import logoLight from '../../assets/react-icon-b.png';
import searchIconLight from '../../assets/search-w.png';
import searchIconDark from '../../assets/search-b.png';
import toggleLight from '../../assets/night-mode.png';
import toggleDark from '../../assets/day.png';

export default function Navbar({ theme, setTheme }) {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  // Check localStorage for login status on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Toggle theme between light and dark
  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleLogout = () => {
    // Clear login information from local storage
    localStorage.removeItem('isLoggedIn');
    // Navigate to the LoginForm
    navigate('/login'); 
  };

  return (
    <div className="navbar">
      <img src={theme === 'light' ? logoLight : logoDark} alt="logo" className="logo" />
      <h3>React JS Website</h3>

      <ul>
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="#">About</Link></li>
        <li><Link to="#">Contact</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>

      <div className="searchBox">
        <input type="text" placeholder="Search" />
        <img src={theme === 'light' ? searchIconLight : searchIconDark} alt="Search Icon" />
      </div>

      <img 
        onClick={toggleMode} 
        src={theme === 'light' ? toggleLight : toggleDark} 
        alt="Toggle Icon" 
        className="Toggle-icone" 
      />
    </div>
  );
}
