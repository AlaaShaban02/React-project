import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {


  const [users, setUsers] = useState([]);
  // Fetching data from the API
  const getUsers = async () => {
    try {
      const response = await axios.get("https://freetestapi.com/api/v1/users?limit=5");
      console.log(response.data); 
      setUsers(response.data.users || []); // Assuming response.data has a 'users' field
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Run getUsers once after the component mounts
  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="home-container">
      <div className="main-content">
      <h1>Welcome to the Home Page</h1>
      
      {/* linking to other sections */}
      <a href="/users" >
        Go to Users
      </a>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user,index) => {
              return(
                <>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                </>
              )
            })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
