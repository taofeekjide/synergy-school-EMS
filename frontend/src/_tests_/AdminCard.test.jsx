import React from "react";
import { render, screen } from "@testing-library/react";
import { FaUser } from "react-icons/fa";
import AdminCard from "../components/dashboard/AdminCard";
import "@testing-library/jest-dom";

describe("AdminCard", () => {
  it("renders the text and number properly", () => {
    render(
      <AdminCard
        icon={<FaUser data-testid="icon" />}
        text="Employees"
        number={1500}
      />
    );

    // Text content
    expect(screen.getByText("Employees")).toBeInTheDocument();

    // Formatted number
    expect(screen.getByText("1,500")).toBeInTheDocument();

    // Icon should be present
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies the correct color class", () => {
    const { container } = render(
      <AdminCard
        icon={<FaUser />}
        text="Leaves"
        number={300}
        color="bg-green-600"
      />
    );

    // Look for the div with the green background
    const coloredDiv = container.querySelector(".bg-green-600");
    expect(coloredDiv).toBeInTheDocument();
  });
});
