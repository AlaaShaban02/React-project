import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Home from './components/home/Home.jsx'; 
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'; 
import LoginForm from './components/loginForm/LoginForm.jsx';
import UserDetails from './components/userDetails/UserDetails.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { DataProvider } from './components/DataContext.jsx';
import './index.css';

export default function App() {
  const location = useLocation(); // Get current route
  
  // Manage login status using localStorage
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    // Get login status from localStorage on component mount
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Theme management
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  // Login function to be passed down to LoginForm for handling login
  const handleLogin = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Logout function to allow users to log out
  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className={`container ${theme}`}>
      {/* Conditionally render Navbar if user is logged in */}
      {isUserLoggedIn && (location.pathname === '/home' || location.pathname.startsWith('/user/')) && (
        <Navbar theme={theme} setTheme={setTheme} onLogout={handleLogout} /> // Pass handleLogout to Navbar if needed
      )}
  <DataProvider>
    <Routes>
        {/* Redirect to Home if user is logged in, otherwise show Login page */}
        <Route 
          path="/" 
          element={isUserLoggedIn ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />} // Pass handleLogin to LoginForm
        />
        <Route path="/home" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/user/:id" element={<UserDetails theme={theme} setTheme={setTheme} />} />
        <Route path="*" element={<PageNotFound />} /> {/* 404 Page */}
      </Routes>
  </DataProvider>
      
    </div>
  );
}
