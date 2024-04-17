import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductsTable from './ProductsTable';
import '@testing-library/jest-dom/extend-expect';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),
  })
);

describe('ProductsTable Component', () => {
  test('renders table with products data', async () => {
    const { getByText } = render(<ProductsTable />);

    // Wait for the products to load
    await waitFor(() => expect(getByText('Product Deleted Successfully')).toBeInTheDocument());
  });

  test('deletes a product when delete icon is clicked', async () => {
    // Mocking the fetch function to return a success response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Product Deleted Successfully' }),
      })
    );

    const { getByLabelText, getByText } = render(<ProductsTable />);

    // Click the delete icon for the first product
    fireEvent.click(getByLabelText('delete'));

    // Wait for the alert message
    await waitFor(() => expect(getByText('Product Deleted Successfully')).toBeInTheDocument());
  });

  test('paginates products correctly', async () => {
    // Mocking the fetch function to return an array of 10 products
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: new Array(10).fill({}) }),
      })
    );

    const { getByLabelText, getByText } = render(<ProductsTable />);

    // Wait for the products to load
    await waitFor(() => expect(getByText('Product Deleted Successfully')).toBeInTheDocument());

    // Change the rows per page to 5
    fireEvent.change(getByLabelText('Rows per page'), { target: { value: '5' } });

    // Check if only 5 products are displayed
    expect(getByText('1-5 of 10')).toBeInTheDocument();

    // Change the page to 2
    fireEvent.click(getByLabelText('Go to next page'));

    // Check if the next 5 products are displayed
    expect(getByText('6-10 of 10')).toBeInTheDocument();
  });
});
