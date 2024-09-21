import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'; // Adjust the import path if necessary

// Mock the useNavigate hook from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Header component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mocked navigation before each test
  });

  test('renders the title "Point Master"', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Check if the title "Point Master" is rendered
    const title = screen.getByText('Point Master');
    expect(title).toBeInTheDocument();
  });

  test('renders the "Contact Us" link and scrolls to contact section when clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Mock document.getElementById
    const scrollIntoViewMock = jest.fn();
    const contactSectionMock = { scrollIntoView: scrollIntoViewMock };
    document.getElementById = jest.fn().mockReturnValue(contactSectionMock);

    // Check if "Contact Us" link is present
    const contactLink = screen.getByText('Contact Us');
    expect(contactLink).toBeInTheDocument();

    // Simulate clicking the "Contact Us" link
    fireEvent.click(contactLink);

    // Check if scrollIntoView was called
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('renders the "Log In" button and navigates to /login when clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check if "Log In" button is present
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    // Simulate clicking the "Log In" button
    fireEvent.click(loginButton);

    // Check if navigation to "/login" was called
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
