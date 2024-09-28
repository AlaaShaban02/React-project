import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Home.scss';

export default function Home({ theme }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

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

  // Function to sort users by name
  const sortUsersByName = () => {
    const sorted = [...filteredUsers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredUsers(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order
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

        {/* Sort Button */}
        <button onClick={sortUsersByName}>
          Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>

        {/* Users Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Name</th>
              <th>Occupation</th>
              <th>Details</th> 
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.occupation}</td>
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
                <td colSpan="4">No users found.</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
