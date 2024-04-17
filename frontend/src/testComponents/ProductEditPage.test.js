import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductEditPage from './ProductEditPage';
import '@testing-library/jest-dom/extend-expect';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Product Updated Successfully' }),
  })
);

describe('ProductEditPage Component', () => {
  test('renders product form and handles form submission', async () => {
    const { getByLabelText, getByText } = render(<ProductEditPage />);

    // Fill in form fields
    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Product' } });
    fireEvent.change(getByLabelText('Price'), { target: { value: '50' } });
    fireEvent.change(getByLabelText('Category'), { target: { value: 'Test Category' } });
    fireEvent.change(getByLabelText('Image'), { target: { value: 'test_image.jpg' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });

    // Submit the form
    fireEvent.submit(getByText('Update Product'));

    // Wait for the alert message
    await waitFor(() => expect(getByText('Product Updated Successfully')).toBeInTheDocument());
  });

  test('displays validation errors for empty form submission', async () => {
    const { getByText } = render(<ProductEditPage />);

    // Submit the form without filling in any fields
    fireEvent.submit(getByText('Update Product'));

    // Validation errors should be displayed for each required field
    expect(getByText('Title')).toHaveAttribute('required');
    expect(getByText('Price')).toHaveAttribute('required');
    expect(getByText('Category')).toHaveAttribute('required');
    expect(getByText('Image')).toHaveAttribute('required');
    expect(getByText('Description')).toHaveAttribute('required');
  });

  test('handles server error during form submission', async () => {
    // Mocking the fetch function to return an error response
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Server Error')));

    const { getByLabelText, getByText } = render(<ProductEditPage />);

    // Fill in form fields
    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Product' } });
    fireEvent.change(getByLabelText('Price'), { target: { value: '50' } });
    fireEvent.change(getByLabelText('Category'), { target: { value: 'Test Category' } });
    fireEvent.change(getByLabelText('Image'), { target: { value: 'test_image.jpg' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });

    // Submit the form
    fireEvent.submit(getByText('Update Product'));

    // Wait for the alert message
    await waitFor(() => expect(getByText('Product Updated Successfully')).toBeInTheDocument());
  });

});
