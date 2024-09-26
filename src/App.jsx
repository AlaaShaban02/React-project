import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Import Navigate for redirection
import Home from './components/home/Home.jsx'; 
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'; 
import LoginForm from './components/loginForm/LoginForm.jsx';
import UserDetails from './components/userDetails/UserDetails.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import './index.css';

export default function App() {
  const location = useLocation(); // Get current route

  // Check if user is logged in by checking a token or user data in localStorage
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light'); 

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <div className={`container ${theme}`}>
      {/* Conditionally render Navbar only on home page */}
      {isUserLoggedIn && location.pathname === '/home' && <Navbar theme={theme} setTheme={setTheme} />}

      <Routes>
        {/* Redirect to Home if user is logged in, otherwise show Login page */}
        <Route path="/" element={isUserLoggedIn ? <Navigate to="/home" /> : <LoginForm />} />
        <Route path="/home" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<LoginForm theme={theme} setTheme={setTheme} />} />
        <Route path="/user/:id" element={<UserDetails theme={theme} setTheme={setTheme} />} /> {/* Route to UserDetails */}
        <Route path="*" element={<PageNotFound />} /> {/* 404 Page */}
      </Routes>
    </div>
  );
}
