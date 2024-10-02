import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from '@mui/material';
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
    setSelectedOccupation(''); // Clear occupation filter when typing in search
  };

  // Handle occupation filter changes
  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value);
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
  const filterUsers = () => {
    let filteredUsers = users;

    // Step 1: Apply search term filter
    if (searchTerm) {
      filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Step 2: Apply occupation filter on top of the search results
    if (selectedOccupation) {
      filteredUsers = filteredUsers.filter((user) =>
        user.occupation && user.occupation.toLowerCase() === selectedOccupation.toLowerCase()
      );
    }

    setFilteredUsers(filteredUsers);
    setCurrentPage(1); // Reset to first page after search/filter
  };

  // Trigger filtering whenever searchTerm or selectedOccupation changes
  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedOccupation]);

  // Get current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (event, newPage) => setCurrentPage(newPage + 1); // MUI uses zero-based indexing for pagination

  return (
    <div className={`home-container ${theme}`}>
      <div className="main-content">
        <Typography variant="h4" gutterBottom>Welcome to the Home Page</Typography>
        
        <div className='search-filter-sort-container'>
          {/* Search Input */}
          <TextField
            label="Search users..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '16px', marginLeft: '60px' }}
          />

          {/* Occupation Dropdown */}
          <Select
            value={selectedOccupation}
            onChange={handleOccupationChange}
            displayEmpty
            style={{ marginBottom: '16px', width: '200px', marginLeft: '20px' }}
          >
            <MenuItem value="">
              <em>All Occupations</em>
            </MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Accountant">Accountant</MenuItem>
            <MenuItem value="Marketing Manager">Marketing Manager</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Marketing Specialist">Marketing Specialist</MenuItem>
            <MenuItem value="Software Developer">Software Developer</MenuItem>
          </Select>

          {/* Sort Button */}
          <Button variant="contained" onClick={handleSort} style={{ marginBottom: '16px' }}>
            Sort by Name {sortOrder === 'asc' ? '▲' : '▼'}
          </Button>
        </div>

        {/* Users Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Profiles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.occupation}</TableCell>
                    <TableCell>
                      <Link to={`/user/${user.id}`}>View Profile</Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4">No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={usersPerPage}
          page={currentPage - 1}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
}
