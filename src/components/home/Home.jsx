import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home({ theme }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current Page
  const usersPerPage = 5; // Set how many users to show per page

  // Fetching data from the API using axios
  const getUsers = async () => {
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/users?limit=30');
      setUsers(response.data);
      setFilteredUsers(response.data);
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

  // Handle search only when pressing "Enter"
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      filterUsers();
    }
  };

  // Handle occupation filter changes
  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value);
    filterUsers(event.target.value);
  };

  // Handle sorting by name
  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filter users based on search term and selected occupation
  const filterUsers = (occupation = selectedOccupation) => {
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (occupation !== '') {
      filtered = filtered.filter((user) => user.occupation === occupation);
    }

    setFilteredUsers(filtered);
  };

  // Get current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers (fixed at 3 pages)
  const totalPages = Math.min(3, Math.ceil(filteredUsers.length / usersPerPage)); // Limit to 3 pages max
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="main-content">
        <h1>Welcome to the Home Page</h1>

        {/* Search Input */}
        <input
          className="search-box"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />

        {/* Occupation Dropdown */}
        <select
          className="occupation-filter"
          value={selectedOccupation}
          onChange={handleOccupationChange}
        >
          <option value="">All Occupations</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Teacher">Teacher</option>
          <option value="Accountant">Accountant</option>
          <option value="Marketing Manager">Marketing Manager</option>
          <option value="Student">Student</option>
          <option value="Marketing Specialist">Marketing Specialist</option>
          <option value="Software Developer">Software Developer</option>
        </select>

        {/* Sort Button */}
        <button className="sort-button" onClick={handleSort}>
          Sort by Name {sortOrder === 'asc' ? '▲' : '▼'}
        </button>

        {/* Users Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Occupation</th>
              <th>Profiles</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.occupation}</td>
                  <td>
                    <Link to={`/user/${user.id}`}>View Profile</Link>
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

        {/* Pagination */}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
