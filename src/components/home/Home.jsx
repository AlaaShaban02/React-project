import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Home.scss';

export default function Home({ theme }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  // Fetching data from the API using axios
  const getUsers = async () => {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/users?limit=10');
      setUsers(response.data);
      setFilteredUsers(response.data); // Set initial filtered users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Handle search term input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle the search only when pressing "Enter"
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className={`home-container ${theme}`}>
      <div className="main-content">
        <h1>Welcome to the Home Page</h1>
        
        {/* Search Input */}
        <input
          className='search-box'
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Trigger search on "Enter"
        />

        {/* Users Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th> 
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                <td colSpan="3">No users found.</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
