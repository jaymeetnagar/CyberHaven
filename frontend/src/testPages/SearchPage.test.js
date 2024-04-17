import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '../Pages/SearchPage';

test('displays products correctly after filtering', () => {
  render(<SearchPage />);
  const searchInput = screen.getByPlaceholderText('Search products...');
  
  // Enter a search query to filter products
  fireEvent.change(searchInput, { target: { value: 'laptop' } });
  
  // Assert that filtered products are displayed correctly
  expect(screen.getByText('Search Results for "laptop"')).toBeInTheDocument();
  expect(screen.getByText('Product Name')).toBeInTheDocument(); // Example assertion
});

test('displays correct message when no products are available', () => {
  render(<SearchPage />);
  const searchInput = screen.getByPlaceholderText('Search products...');
  
  // Enter a search query that does not match any products
  fireEvent.change(searchInput, { target: { value: 'xyz' } });
  
  // Assert that the message for no products is displayed
  expect(screen.getByText('No products available.')).toBeInTheDocument();
});

test('displays correct message when user is authenticated', () => {
  // Mocking getUserData function to return authenticated user
  jest.mock('../store', () => ({
    getUserData: jest.fn().mockReturnValue({ isAuthenticated: true, name: 'John' })
  }));

  render(<SearchPage />);
  
  // Assert that the greeting message for authenticated user is displayed
  expect(screen.getByText('Hello, John')).toBeInTheDocument();
});
