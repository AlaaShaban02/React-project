import React from 'react';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      
      {/* linking to other sections */}
      <a href="/users" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Users
      </a>
    </div>
  );
}
