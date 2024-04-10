import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CartPage from '../Pages/CartPage.jsx';

describe('CartPage', () => {
  test('renders "Please login to view cart items" when user is not authenticated', () => {
    const getUserData = jest.fn().mockReturnValue({ isAuthenticated: false });
    const mockStore = require('../store.js');
    mockStore.getUserData = getUserData;

    render(<CartPage getUserData={getUserData} />);

    expect(screen.getByText('Please login to view cart items')).toBeInTheDocument();
  });

  test('fetches and renders cart items when user is authenticated', async () => {
    const cartItems = [
      { _id: '1', title: 'Product 1', price: 10, quantity: 2, imageURL: 'image1.jpg' },
      { _id: '2', title: 'Product 2', price: 15, quantity: 1, imageURL: 'image2.jpg' }
    ];
    const getUserData = jest.fn().mockReturnValue({ isAuthenticated: true });
    const fetchCartItems = jest.fn().mockResolvedValue({ data: { items: cartItems } });
    const fetchProductByProductId = jest.fn().mockResolvedValue({});

    const mockStore = require('../store.js');
    mockStore.getUserData = getUserData;

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: () => ({ data: { items: {} } }) })
      .mockResolvedValueOnce({ json: () => ({ data: { items: {} } }) })
      .mockResolvedValue({ json: () => ({ data: {} }) });

    render(<CartPage getUserData={getUserData} />);

    await waitFor(() => expect(fetchCartItems).toHaveBeenCalled());

    expect(fetchCartItems).toHaveBeenCalled();
    expect(fetchProductByProductId).toHaveBeenCalledTimes(cartItems.length);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument(); // 10 * 2
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
  });

  test('handles delete button click', async () => {
    const cartItems = [{ _id: '1', title: 'Product 1', price: 10, quantity: 2 }];
    const getUserData = jest.fn().mockReturnValue({ isAuthenticated: true });
    const fetchCartItems = jest.fn().mockResolvedValue({ data: { items: cartItems } });
    const fetchProductByProductId = jest.fn().mockResolvedValue({});

    const mockStore = require('../store.js');
    mockStore.getUserData = getUserData;

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: () => ({ data: { items: {} } }) })
      .mockResolvedValue({ json: () => ({ message: 'Cart Updated' }) });

    render(<CartPage getUserData={getUserData} />);

    await waitFor(() => expect(fetchCartItems).toHaveBeenCalled());

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(fetchCartItems).toHaveBeenCalledTimes(2));
  });
});
