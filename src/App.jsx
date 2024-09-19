import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home.jsx'; 
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'; 
import LoginForm from './components/loginForm/LoginForm.jsx';
import Users from './components/users/User.jsx';
import Navbar from './components/navbar/Navbar.jsx';

export default function App() {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Conditionally render Navbar, hide on login page */}
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginForm />} /> {/* Login Page */}
        <Route path="*" element={<PageNotFound />} /> {/* 404 Page */}
      </Routes>
    </>
  );
}
