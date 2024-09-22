import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LogIn from "./LogIn";
import { AuthProvider } from "../../context/AuthContext"; // Import your Auth context provider
import axios from "axios";

// Mock axios
jest.mock("axios");

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LogIn Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require("react-router-dom").useNavigate.mockImplementation(
      () => mockNavigate
    );
  });

  test("renders LogIn form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LogIn />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("submits the form successfully and navigates to dashboard", async () => {
    // Mock the successful login response
    axios.post.mockResolvedValueOnce({ status: 200, data: "mockAccessToken" });

    render(
      <MemoryRouter>
        <AuthProvider>
          <LogIn />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/log in/i));

    // Wait for the API response and check if navigate was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    // Check that the success message is displayed (if you have one)
    // Alternatively, you can add a specific check if you want to verify the new page
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument(); // Optional, remove if not applicable
  });

  test("shows error message on invalid credentials", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LogIn />
        </AuthProvider>
      </MemoryRouter>
    );

    // Mock the error response for invalid credentials
    axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText(/log in/i));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/invalid credentials. please try again/i)
      ).toBeInTheDocument();
    });
  });
  
});
