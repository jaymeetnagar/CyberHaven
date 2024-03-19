import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Create AdminLogin.css file for custom styling

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can implement your authentication logic here
    fetch('http://localhost:3001/admin-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(data => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          navigate('/admin');
          console.log('Login successful');
        } else {
          setErrorMessage('Invalid Email or Password');
        }
      });
  };

  return (
    <div>
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2 className="mb-4">Admin Login</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder='Enter Your Password'
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
        
      </div>
    </div>
  );
};

export default AdminLogin;