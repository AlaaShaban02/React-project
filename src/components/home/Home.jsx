import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Home.css';

export default function Home( {theme} ) {
  const [users, setUsers] = useState([]);

  // Fetching data from the API using axios
  const getUsers = async () => {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/users?limit=15');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={`home-container ${theme}`}>
      <div className="main-content">
        <h1>Welcome to the Home Page</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th> 
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    {/* Link to the UserDetails page, passing the user ID */}
                    <Link to={`/user/${user.id}`}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No users found.</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
