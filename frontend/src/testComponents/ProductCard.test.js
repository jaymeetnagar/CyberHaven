import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const product = {
  _id: '1',
  title: 'Sample Product',
  price: 10,
  imageURL: 'sample_image.jpg',
  category: 'Sample Category'
};

describe('ProductCard', () => {
  it('renders product details', () => {
    render(
      <Router>
        <ProductCard product={product} onAddToCart={() => {}} />
      </Router>
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });

  it('calls onAddToCart when "Add to Cart" button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(
      <Router>
        <ProductCard product={product} onAddToCart={mockAddToCart} />
      </Router>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(product._id);
  });

  it('navigates to product details page when "View Details" button is clicked', () => {
    render(
      <Router>
        <ProductCard product={product} onAddToCart={() => {}} />
      </Router>
    );

    fireEvent.click(screen.getByText('View Details'));
    expect(window.location.pathname).toBe(`/product-details/${product._id}`);
  });
});