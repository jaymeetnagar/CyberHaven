import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import './AdminLogin.css'; // Create AdminLogin.css file for custom styling

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can implement your authentication logic here
    fetch('/admin-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
          console.log('Login successful');
        } else {
          setErrorMessage('Invalid username or password');
        }
      });
  };

  return (
    <div>
      {!isLoggedIn && <div className="admin-login-container">
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
              Login
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>}
      {isLoggedIn && <AdminPage />}
    </div>
  );
};

export default AdminLogin;