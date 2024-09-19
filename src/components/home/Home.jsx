import React from 'react';
import './Home.css';

export default function Home( {theme} ) {
  return (
    <div className={`home-container ${theme}` }>
      <div className="main-content">
      <h1>Welcome to the Home Page</h1>
      
      {/* linking to other sections */}
      <a href="/users" >
        Go to Users
      </a>
      </div>
    </div>
  );
}
