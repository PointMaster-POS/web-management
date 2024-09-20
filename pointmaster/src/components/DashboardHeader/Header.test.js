// Header.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import { notifications } from "../Data";

// Mock window.matchMedia for responsive features
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  

// Mock navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe("Header component", () => {
  const setIsAuthenticated = jest.fn(); // mock the setIsAuthenticated prop

  beforeEach(() => {
    render(
      <Router>
        <Header setIsAuthenticated={setIsAuthenticated} />
      </Router>
    );
  });

  test("renders header title", () => {
    const headerTitle = screen.getByText(/Welcome to Point Master/i);
    expect(headerTitle).toBeInTheDocument();
  });

  test("renders notification bell with correct count", () => {
    const notificationBell = screen.getByRole("img", { name: /bell/i });
    expect(notificationBell).toBeInTheDocument();

    const badgeCount = screen.getByText(notifications.length);
    expect(badgeCount).toBeInTheDocument();
  });

  test("opens notification list on bell icon click", () => {
    const notificationBell = screen.getByRole("img", { name: /bell/i });

    // Simulate a click on the notification bell
    fireEvent.click(notificationBell);

    // Check if notifications popover opens
    const popoverTitle = screen.getByText(/Notifications/i);
    expect(popoverTitle).toBeInTheDocument();

    // Check if a notification from the list is rendered
    if (notifications.length > 0) {
      const firstNotificationTitle = screen.getByText(notifications[0].title);
      expect(firstNotificationTitle).toBeInTheDocument();
    }
  });

  test("renders profile avatar", () => {
    const avatar = screen.getByRole("img", { name: /user/i });
    expect(avatar).toBeInTheDocument();
  });

  test("opens dropdown menu on avatar click", () => {
    const avatar = screen.getByRole("img", { name: /user/i });

    // Simulate a click on the avatar
    fireEvent.click(avatar);

    // Check if menu items appear
    const profileMenuItem = screen.getByText(/Profile/i);
    expect(profileMenuItem).toBeInTheDocument();

    const settingsMenuItem = screen.getByText(/Settings/i);
    expect(settingsMenuItem).toBeInTheDocument();

    const logOutMenuItem = screen.getByText(/Log Out/i);
    expect(logOutMenuItem).toBeInTheDocument();
  });

  test("calls setIsAuthenticated when log out is clicked", () => {
    const avatar = screen.getByRole("img", { name: /user/i });

    // Simulate a click on the avatar to open the dropdown
    fireEvent.click(avatar);

    // Simulate a click on the "Log Out" menu item
    const logOutMenuItem = screen.getByText(/Log Out/i);
    fireEvent.click(logOutMenuItem);

    // Assert that setIsAuthenticated was called with 'false'
    expect(setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
