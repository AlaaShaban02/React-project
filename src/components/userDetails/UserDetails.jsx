import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Corrected imports
import axios from 'axios';
import './UserDetails.scss';
import userphoto from '../../assets/user-profile.jpg';

export default function UserDetails({ theme }) {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null); // Store user details
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the user details using the ID
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://freetestapi.com/api/v1/users/${id}`);
      setUser(response.data); // Store the fetched user
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]); // Re-fetch user details if ID changes

  if (!user) {
    return <div>Loading...</div>; // Show a loading state until the user data is fetched
  }

  return (
    <div className={`user-container ${theme}`}>
      <div className="user-details">
        <h1>{user.name} Profile</h1>
        <div className="user-img">
          <img src={userphoto} alt="user-img"></img>
        </div>
      </div>
      <div className="content">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Address:</strong></p>
        <p><strong>Street:</strong> {user.address.street}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>Zip:</strong> {user.address.zip}</p>
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Hobbies:</strong> {user.hobbies}</p>
        <button className='back-to-home' onClick={() => navigate('/')}> Home Page</button>
      </div>
      
    </div>
  );
}
