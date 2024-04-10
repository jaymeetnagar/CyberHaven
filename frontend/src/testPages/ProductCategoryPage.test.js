import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductCategoryPage from '../Pages/ProductCategoryPage';
import axios from 'axios';

jest.mock('axios');

describe('ProductCategoryPage', () => {
  test('renders correct category name', () => {
    render(
      <MemoryRouter initialEntries={['/products/laptop']}>
        <Route path="/products/:category">
          <ProductCategoryPage />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText('Category: Laptop')).toBeInTheDocument();
  });

  test('fetches and displays products of the selected category', async () => {
    const products = [
      { _id: '1', title: 'Product 1', category: 'laptop', imageURL: 'image1.jpg' },
      { _id: '2', title: 'Product 2', category: 'laptop', imageURL: 'image2.jpg' }
    ];

    axios.get.mockResolvedValueOnce({ data: { data: products } });

    render(
      <MemoryRouter initialEntries={['/products/laptop']}>
        <Route path="/products/:category">
          <ProductCategoryPage />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('displays message when no products available for the selected category', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: [] } });

    render(
      <MemoryRouter initialEntries={['/products/laptop']}>
        <Route path="/products/:category">
          <ProductCategoryPage />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No products available of category Laptop.')).toBeInTheDocument();
    });
  });
});
