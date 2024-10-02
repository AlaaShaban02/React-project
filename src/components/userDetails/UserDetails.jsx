import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetails.scss';
import userphoto from '../../assets/user-profile.jpg';

export default function UserDetails({ theme }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://freetestapi.com/api/v1/users/${id}`);
      setUser(response.data);
      setError(null); // Reset the error if the user is found
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (error.response && error.response.status === 404) {
        setError('User not found'); // Set error if user is not found (404)
      } else {
        setError('An error occurred while fetching the user details'); // General error message
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>; // Show error message if there's an error
  }

  if (!user) {
    return <div className='loading-massege'>Loading...</div>; // Show loading while fetching user
  }

  return (
    <div className={`user-container ${theme}`}>
      <div className="user-details">
        <h1>{user.name} Profile</h1>
        <div className="user-img">
          <img src={userphoto} alt="user-img" />
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
        <button className='back-to-home' onClick={() => navigate('/')}>
          ← Back
        </button>
      </div>
    </div>
  );
}
