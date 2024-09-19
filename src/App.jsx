import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home.jsx'; 
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'; 
import LoginForm from './components/loginForm/LoginForm.jsx';
import Users from './components/users/User.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import './index.css';



export default function App() {
  const location = useLocation(); // Get current route
  
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState( current_theme? current_theme :'light'); 

  useEffect(()=>{
     localStorage.setItem('current_theme', theme);
  },[theme])

  
  return (
    <div className ={`container ${theme}`} >

      {/* Conditionally render Navbar, hide on login page */}
      {location.pathname !== '/' &&  <Navbar theme={theme} setTheme={setTheme} /> }

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/" element={<LoginForm />} /> {/* Login Page */}
        <Route path="*" element={<PageNotFound />} /> {/* 404 Page */}
      </Routes>
  
  </div>
  );
}
