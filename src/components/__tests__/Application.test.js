import React from "react";
import axios from "axios";

import { 
  render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent,
  getByText, queryByText, getAllByTestId, getByAltText,
  getByPlaceholderText, prettyDOM, getByDisplayValue} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  // ********************************* TEST 1 **********

/*   // Promise version
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"))
        expect(getByText("Leopold Silvers")).toBeInTheDocument()
      });
  }); */

  // await version
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // ********************************* TEST 2 **********

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
 
    // debug();                       // 🚨🚨🚨
    // console.log(prettyDOM(day ));  // 🚨🚨🚨
  });

  // ********************************* TEST 3 **********

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /Are you sure you would like to delete?/i)).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    // debug();                       // 🚨🚨🚨
    // console.log(prettyDOM(appointment ));  // 🚨🚨🚨
  });

  // ********************************* TEST 4 **********

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Check that the element with the text "Tori Malcolm" is displayed.
    expect(getByAltText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the text "Saving" been removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    // 9. Check that the element with the text "Sylvia Palmer" is displayed.
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    // 10. Check that the element with the text "Archie Cohen" is displayed.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    // 11. Check that the DayListItem with the text "Monday" also has same spots remaining.
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // debug();                       // 🚨🚨🚨
    // console.log(prettyDOM(appointment ));  // 🚨🚨🚨
  });

  // ********************************* TEST 5 **********

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Check that the element with the text "Tori Malcolm" is displayed.
    expect(getByAltText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the text "Saving" been removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    // 9. Check that the element with the text "Could not update appointment." is displayed.
    expect(getByText(appointment, /Could not update appointment./i)).toBeInTheDocument();
    // 10. Click the "Close" button on error message container.
    fireEvent.click(getByAltText(appointment, "Close"));
    // 11. Check that the element with the text "Tori Malcolm" is displayed.
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // 12. Check that the input value "Archie Cohen" is displayed.
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
 
    // debug();                       // 🚨🚨🚨
    // console.log(prettyDOM(appointment ));  // 🚨🚨🚨
  });

  // ********************************* TEST 6 **********

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container,"appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /Are you sure you would like to delete?/i)).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the text "Deleting" been removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    // 8. Check that the element with the text "Could not cancel appointment." is displayed.
    expect(getByText(appointment, /Could not cancel appointment./i)).toBeInTheDocument();
    // 9. Click the "Close" button on error message container.
    fireEvent.click(getByAltText(appointment, "Close"));
    // 10. Check that the element with the text "Tori Malcolm" is displayed.
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // 11. Check that the element with the text "Archie Cohen" is displayed.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    // debug();                       // 🚨🚨🚨
    // console.log(prettyDOM(appointment ));  // 🚨🚨🚨
  });

});

