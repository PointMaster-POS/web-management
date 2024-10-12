// Mock react-chartjs-2 and chart.js modules
jest.mock("react-chartjs-2", () => ({
    Line: () => <div>Mocked Line Chart</div>,
  }));
  
  jest.mock("chart.js", () => ({
    Chart: {
      register: jest.fn(), // Mock the Chart.register function
    },
    registerables: [],
  }));
  
  import React from "react";
  import { render, screen, fireEvent, waitFor } from "@testing-library/react";
  import Dashboard from "./Dashboard";
  import { PopularItemsList, OutOfStockList } from "../../components/Data";
  
  describe("Dashboard Component", () => {
    beforeEach(() => {
      render(<Dashboard />);
    });
  
    test("renders the dashboard correctly with key elements", () => {
      expect(screen.getByText(/Sales Overview/i)).toBeInTheDocument();
      expect(screen.getByText(/Popular Items/i)).toBeInTheDocument();
      expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
    });
  
    test("renders sales card with the correct default title", () => {
      expect(screen.getByText("Today Sales")).toBeInTheDocument();
    });
  
    test("renders purchases card with the correct default title", () => {
      expect(screen.getByText("Today Purchases")).toBeInTheDocument();
    });

  
    test("renders out-of-stock items with correct data", () => {
      OutOfStockList.slice(0, 3).forEach((item) => {
        expect(screen.getByText(item.item)).toBeInTheDocument();
      });
    });
  
    test("renders the mocked chart instead of the real one", () => {
      expect(screen.getByText("Mocked Line Chart")).toBeInTheDocument();
    });
  });
  