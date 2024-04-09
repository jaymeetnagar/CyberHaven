import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterComponent from '../Components/FooterComponent';

describe('FooterComponent', () => {
  it('renders footer text', () => {
    render(<FooterComponent />);
    expect(screen.getByText('© CyberHaven')).toBeInTheDocument();
  });

  it('renders footer with correct className', () => {
    render(<FooterComponent />);
    expect(screen.getByRole('contentinfo')).toHaveClass('text-center');
    expect(screen.getByRole('contentinfo')).toHaveClass('p-3');
  });
});
