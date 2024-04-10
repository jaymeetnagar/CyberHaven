import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NavbarComponent from '../Components/NavbarComponent';

describe('NavbarComponent', () => {
  it('renders navigation links', () => {
    // Render NavbarComponent inside Router
    render(
      <Router>
        <NavbarComponent />
      </Router>
    );

    // Assert navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Headphone')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('Desk')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor')).toBeInTheDocument();
  });
});
