import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./Navbar";

test("Navbar renders correctly", () => {
  const { getByTestId } = render(<Navbar />);
  expect(getByTestId("navbar-text")).toHaveTextContent("LinkVote Challenge");
});
