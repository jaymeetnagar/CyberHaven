import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminPage from '../Components/AdminPage';

describe('AdminPage', () => {
  it('renders CyberHaven heading', () => {
    render(<AdminPage />);
    expect(screen.getByText('CyberHaven')).toBeInTheDocument();
  });

  it('renders UserCRUD component', () => {
    render(<AdminPage />);
    expect(screen.getByText('User CRUD operations')).toBeInTheDocument();
  });

  it('renders ProductCRUD component', () => {
    render(<AdminPage />);
    expect(screen.getByText('Product CRUD operations')).toBeInTheDocument();
  });

  it('renders two columns for UserCRUD and ProductCRUD components', () => {
    render(<AdminPage />);
    const columns = screen.getAllByRole('column');
    expect(columns).toHaveLength(2);
  });

  it('renders UserCRUD component in the first column', () => {
    render(<AdminPage />);
    const columns = screen.getAllByRole('column');
    expect(columns[0]).toContainElement(screen.getByText('User CRUD operations'));
  });

  it('renders ProductCRUD component in the second column', () => {
    render(<AdminPage />);
    const columns = screen.getAllByRole('column');
    expect(columns[1]).toContainElement(screen.getByText('Product CRUD operations'));
  });
});