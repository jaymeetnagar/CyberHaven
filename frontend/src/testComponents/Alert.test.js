import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../Alert';

jest.useFakeTimers();

describe('Alert Component', () => {
  test('displays alert message', () => {
    render(<Alert message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  test('hides alert after 3 seconds', () => {
    render(<Alert message="Test Message" />);
    jest.advanceTimersByTime(3000);
    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  test('stays visible if component unmounted before timeout', () => {
    const { unmount } = render(<Alert message="Test Message" />);
    unmount();
    jest.advanceTimersByTime(3000);
    expect(screen.queryByText('Test Message')).toBeInTheDocument();
  });
});
