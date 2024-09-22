import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterOwner from "./RegisterOwner";
import { MemoryRouter } from "react-router-dom";
import { message } from "antd";

// Mock the fetch function
global.fetch = jest.fn();

describe("RegisterOwner Component", () => {
  const token = "test-token";
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <MemoryRouter> {/* Wrap the component with MemoryRouter */}
        <RegisterOwner token={token} onCancel={mockOnCancel} />
      </MemoryRouter>
    );
  });

  test("renders the form correctly", () => {
    expect(screen.getByLabelText(/Owner Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Owner Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  /* test("submits the form successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/registration/owner-details",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      expect(message.success).toHaveBeenCalledWith("Owner registered successfully!");
    });
  });

  test("displays an error message on failed submission", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    });

    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Failed to register owner. Please try again.");
    });
  });
 */
  test("calls onCancel when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test("displays validation messages", async () => {
    fireEvent.click(screen.getByText(/Register/i));

    expect(await screen.findByText(/Please input the owner's name!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input a valid email!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input the password!/i)).toBeInTheDocument();
  });
});
