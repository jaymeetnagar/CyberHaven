import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutPage from '../Pages/CheckoutPage';

describe('CheckoutPage', () => {
  test('renders form elements correctly', () => {
    render(<CheckoutPage />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Back to Cart')).toBeInTheDocument();
  });

  test('form submission triggers correct action', () => {
    render(<CheckoutPage />);

    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone Number');
    const cardNumberInput = screen.getByLabelText('Card Number');
    const expiryDateInput = screen.getByLabelText('Expiry Date');
    const cvvInput = screen.getByLabelText('CVV');
    const checkoutButton = screen.getByText('Checkout');

    fireEvent.change(fullNameInput, { target: { value: 'Sev Mamra' } });
    fireEvent.change(emailInput, { target: { value: 'sev.mamra@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '4561237890' } });
    fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
    fireEvent.change(expiryDateInput, { target: { value: '10/26' } });
    fireEvent.change(cvvInput, { target: { value: '132' } });
    fireEvent.click(checkoutButton);

    // Add your assertions here to test the action triggered by form submission
  });

  test('displays alert message after form submission', () => {
    render(<CheckoutPage />);

    const checkoutButton = screen.getByText('Checkout');

    fireEvent.click(checkoutButton);

    expect(screen.getByText('Checkout Completed. Thank you!')).toBeInTheDocument();
  });
});
