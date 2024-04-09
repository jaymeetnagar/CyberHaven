import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLogin from '../Components/AdminLogin';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AdminLogin', () => {
  it('renders admin login form', () => {
    render(
      <Router>
        <AdminLogin />
      </Router>
    );

    // Assert the presence of email and password fields
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('allows users to login with valid credentials', async () => {
    // Mock the fetch request to return a successful login response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        message: 'Login successful',
        userData: { isAdmin: true },
      }),
    });

    render(
      <Router>
        <AdminLogin />
      </Router>
    );

    // Fill out the form with valid credentials
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'admin123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Assert that the user is redirected to the admin page
    await waitFor(() => expect(window.location.pathname).toEqual('/admin'));
  });

  it('displays error message for invalid credentials', async () => {
    // Mock the fetch request to return an error response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        message: 'Invalid Email or Password',
      }),
    });

    render(
      <Router>
        <AdminLogin />
      </Router>
    );

    // Fill out the form with invalid credentials
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'invalidpassword' } });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Assert that the error message is displayed
    await waitFor(() => expect(screen.getByText('Invalid Email or Password')).toBeInTheDocument());
  });
});
