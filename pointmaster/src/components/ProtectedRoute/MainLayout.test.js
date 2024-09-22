// MainLayout.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import MainLayout from './MainLayout';

// Mocking Sider and Header components
jest.mock('../Sider/Sider', () => ({ onCollapse }) => (
  <div>
    <button onClick={() => onCollapse(true)}>Collapse</button>
    <button onClick={() => onCollapse(false)}>Expand</button>
  </div>
));

jest.mock('../DashboardHeader/Header', () => ({ setIsAuthenticated }) => (
  <div>
    <h1>Header</h1>
  </div>
));

describe('MainLayout', () => {
  const setup = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test('renders Header and displays welcome message', () => {
    setup();

    // Check if Header is rendered
    expect(screen.getByText(/Header/i)).toBeInTheDocument();

    // Check for welcome message
    expect(screen.getByText(/Welcome to the System/i)).toBeInTheDocument();
  });

  test('collapses and expands the sidebar', () => {
    setup();

    const collapseButton = screen.getByText(/Collapse/i);
    const expandButton = screen.getByText(/Expand/i);

    // Initially, the sidebar is expanded
    expect(screen.getByText(/Expand/i)).toBeInTheDocument();

    // Simulate collapse
    fireEvent.click(collapseButton);
    expect(screen.getByText(/Expand/i)).toBeInTheDocument();

    // Simulate expand
    fireEvent.click(expandButton);
    expect(screen.getByText(/Expand/i)).toBeInTheDocument();
  });
});
