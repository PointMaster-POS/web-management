import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterOwner from "./RegisterOwner";
import { MemoryRouter } from "react-router-dom";
import { message } from "antd";

// Mock the fetch function
global.fetch = jest.fn();

// Mock the message module
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("RegisterOwner Component", () => {
  const token = "test-token";
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <MemoryRouter>
        <RegisterOwner token={token} onCancel={mockOnCancel} form={null} />
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

  test("displays validation messages if required fields are empty", async () => {
    fireEvent.click(screen.getByText(/Register/i));

    expect(await screen.findByText(/Please input the owner's name!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input a valid email!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please input the password!/i)).toBeInTheDocument();
  });

  test("displays password length validation message if password is too short", async () => {
    fireEvent.change(screen.getByLabelText(/Owner Name/i), {
      target: { value: "Test Owner" },
    });
    fireEvent.change(screen.getByLabelText(/Owner Email/i), {
      target: { value: "owner@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByText(/Register/i));

    expect(await screen.findByText(/Password must be at least 8 characters!/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    fireEvent.change(screen.getByLabelText(/Owner Name/i), {
      target: { value: "Test Owner" },
    });
    fireEvent.change(screen.getByLabelText(/Owner Email/i), {
      target: { value: "owner@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "longenoughpassword" },
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
          body: JSON.stringify({
            business_owner_name: "Test Owner",
            business_owner_mail: "owner@test.com",
            business_password: "longenoughpassword",
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

    fireEvent.change(screen.getByLabelText(/Owner Name/i), {
      target: { value: "Test Owner" },
    });
    fireEvent.change(screen.getByLabelText(/Owner Email/i), {
      target: { value: "owner@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "longenoughpassword" },
    });

    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Failed to register owner. Please try again.");
    });
  });

  test("calls onCancel when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
