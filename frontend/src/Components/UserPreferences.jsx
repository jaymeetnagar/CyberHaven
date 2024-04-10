// Preferences.js
import React, { useState } from 'react';

function UserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    // Other preferences
  });

  const handlePreferenceChange = (e) => {
    const { name, checked, value } = e.target;
    setPreferences(prevState => ({
      ...prevState,
      [name]: name === 'notifications' ? checked : value
    }));
  };

  return (
    <div className="preferences">
      <h3>Saved Preferences</h3>
      <label>
        Theme:
        <select name="theme" value={preferences.theme} onChange={handlePreferenceChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Receive Notifications:
        <input type="checkbox" name="notifications" checked={preferences.notifications} onChange={handlePreferenceChange} />
      </label>
      {/* Other preference options */}
    </div>
  );
}

export default UserPreferences;
