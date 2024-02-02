import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css'; // Create AdminLogin.css file for custom styling

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // You can implement your authentication logic here
    if (username === 'admin' && password === 'admin123') {
      console.log('Login successful');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="mb-4">Admin Login</h2>
        <form>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} className="btn btn-primary">
            <Link to="/admin" className="login-link">Login</Link>
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;