import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./Sider"; // Adjust the import path if necessary

// Mock useNavigate and useLocation hooks
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({ pathname: "/dashboard" }),
}));

describe("SideBar component", () => {
  const onCollapseMock = jest.fn(); // Mock the onCollapse function

  beforeEach(() => {
    mockedNavigate.mockClear(); // Clear the mocked navigate before each test
    onCollapseMock.mockClear(); // Clear the onCollapse mock before each test
  });

  test("renders sidebar with menu items", () => {
    render(
      <BrowserRouter>
        <SideBar onCollapse={onCollapseMock} />
      </BrowserRouter>
    );

    // Check that menu items are rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Stores")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toBeInTheDocument();
  });

  test("navigates to the correct route when a menu item is clicked", () => {
    render(
      <BrowserRouter>
        <SideBar onCollapse={onCollapseMock} />
      </BrowserRouter>
    );

    // Click on the "Stores" menu item
    fireEvent.click(screen.getByText("Stores"));

    // Check if navigate was called with the correct route
    expect(mockedNavigate).toHaveBeenCalledWith("/stores");
  });

  test("sidebar collapses and expands", () => {
    const { rerender } = render(
      <BrowserRouter>
        <SideBar onCollapse={onCollapseMock} />
      </BrowserRouter>
    );

    // Find the collapse/expand trigger
    /* const collapseButton = screen.getByRole('button'); */ // This targets the internal collapse button in Ant Design's Sider
    // Or if you want to ensure you are targeting the right button in a specific context
    const collapseButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    }); // Adjust the name to what your button is labeled

    // Simulate collapsing the sidebar
    fireEvent.click(collapseButton);

    // Check if onCollapse was called with true (collapsed)
    expect(onCollapseMock).toHaveBeenCalledWith(true);

    // Simulate expanding the sidebar
    rerender(
      <BrowserRouter>
        <SideBar onCollapse={onCollapseMock} />
      </BrowserRouter>
    );

    fireEvent.click(collapseButton); // Click again to expand

    // Check if onCollapse was called with false (expanded)
    expect(onCollapseMock).toHaveBeenCalledWith(false);
  });

  test("selects the correct menu item based on the current route", () => {
    render(
      <BrowserRouter>
        <SideBar onCollapse={onCollapseMock} />
      </BrowserRouter>
    );

    // Check that the "Dashboard" menu item is selected by default
    const dashboardMenuItem = screen.getByText("Dashboard");
    expect(dashboardMenuItem.parentElement).toHaveClass(
      "ant-menu-item-selected"
    );
  });
});
