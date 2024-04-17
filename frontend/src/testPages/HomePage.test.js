import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';
import userEvent from '@testing-library/user-event';

jest.mock('../store', () => ({
  getUserData: jest.fn().mockReturnValue({ isAuthenticated: true, name: 'John' })
}));

describe('HomePage Component', () => {
  test('displays featured products correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    // Add assertions to check if featured products are displayed correctly
  });

  test('displays product deals correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('Product Deals')).toBeInTheDocument();
    // Add assertions to check if product deals are displayed correctly
  });

  test('displays all products correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('All Products')).toBeInTheDocument();
    // Add assertions to check if all products are displayed correctly
  });

  test('displays correct message when no featured products are available', () => {
    render(<HomePage />);
    expect(screen.getByText('No featured products available.')).toBeInTheDocument();
  });

  test('displays correct message when no product deals are available', () => {
    render(<HomePage />);
    expect(screen.getByText('No product deals available.')).toBeInTheDocument();
  });

  test('displays correct message when no products are available', () => {
    render(<HomePage />);
    expect(screen.getByText('No products available.')).toBeInTheDocument();
  });

  test('displays alert when product is added to cart', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Product Added to Cart.')).toBeInTheDocument();
  });

  test('displays greeting message for authenticated user', () => {
    render(<HomePage />);
    expect(screen.getByText('Hello, John')).toBeInTheDocument();
  });
});
