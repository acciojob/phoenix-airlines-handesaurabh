import React from "react";
import { render } from "@testing-library/react";
import Home from "./home";

// Mock the components that are dynamically imported
jest.mock("./dashboard", () => () => <div>Dashboard</div>);
jest.mock("../confirmation/confirmation", () => () => <div>Confirmation</div>);
jest.mock("../search/flight-search", () => () => <div>Flight Search</div>);
jest.mock("../booking/flight-booking", () => () => <div>Flight Booking</div>);
jest.mock("../../components/header/header", () => () => <div>Header</div>);
jest.mock("../../components/error/error", () => () => <div>Error Boundaries</div>);

describe("Home Component", () => {
  test("renders without crashing", () => {
    // Mock window.location for Router
    delete window.location;
    window.location = { pathname: "/", href: "http://localhost/" };
    
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
