// Profile.js
import React, { useState, useEffect } from 'react';
import { getUserData } from "../store";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UserProfile() {
    const user = getUserData();
    const navigate = useNavigate(); // Initialize useNavigate
  const [userInfo, setUserInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    // Other user profile information
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('User Info:', userInfo);
    const userInfoToSend = {
        ...userInfo,
        userId: user.userId
    };
    try {
        const response = await fetch('http://localhost:3001/customer', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfoToSend),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }  };

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
  }, [user]);
  return (
    <>
    {user.isAuthenticated && (<div className="profile">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
    </div>)}
    {!user.isAuthenticated && <div>Login to view Profile.</div>}
    </>
  );
}

export default UserProfile;
