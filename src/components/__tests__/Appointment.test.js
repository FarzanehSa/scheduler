// We are rendering `<Application />` down below, so we need React.createElement
import React from "react";
import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment", () => {
  // A test that renders a React Component
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});