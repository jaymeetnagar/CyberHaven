import React from 'react';
import Profile from './UserProfile';
// import Orders from './UserOrders';
import Preferences from './UserPreferences';
import './UserDashboard.css'

function UserDashboard() {
  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="dashboard-content">
        <Profile />
        {/* <Orders /> */}
        <Preferences />
      </div>
    </div>
  );
}

export default UserDashboard;