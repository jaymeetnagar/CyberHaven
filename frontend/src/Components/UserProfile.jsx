// Profile.js
import React, { useState } from 'react';
import { getUserData } from "../store";
function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: 'Nishit Patel',
    email: 'nicpal999@gmail.com',
    // Other user profile information
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit updated user profile
    console.log('Updated user profile:', userInfo);
  };

  return (
    <div className="profile">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        {/* Other profile fields */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserProfile;
