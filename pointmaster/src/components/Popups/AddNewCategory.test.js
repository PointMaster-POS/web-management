// AddNewCategory.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddNewCategory from "./AddNewCategory"; // Adjust the import path as needed

describe("AddNewCategory Component", () => {
  const mockOnAddCategory = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <AddNewCategory onAddCategory={mockOnAddCategory} onCancel={mockOnCancel} />
    );
  });

  test("renders the form with category name input", () => {
    const categoryInput = screen.getByLabelText(/Category Name/i);
    expect(categoryInput).toBeInTheDocument();
  });

  /* test("calls onAddCategory with form values when submitted", async () => {
    const categoryInput = screen.getByLabelText(/Category Name/i);
    const addButton = screen.getByRole("button", { name: /Add category/i });

    fireEvent.change(categoryInput, { target: { value: "New Category" } });
    fireEvent.click(addButton);

    expect(mockOnAddCategory).toHaveBeenCalledWith({
      category_name: "New Category",
    });
  }); */

  test("calls onCancel when Cancel button is clicked", () => {
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("displays validation error when submitting empty form", async () => {
    const addButton = screen.getByRole("button", { name: /Add category/i });

    fireEvent.click(addButton);

    const errorMessage = await screen.findByText(/Please input the category name!/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
