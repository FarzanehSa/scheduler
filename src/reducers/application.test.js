import reducer from "./application";

import { 
  render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent,
  getByText, queryByText, getAllByTestId, getByAltText,
  getByPlaceholderText, prettyDOM, getByDisplayValue} from "@testing-library/react";

afterEach(cleanup);

describe("Application Reducer", () => {

  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
  
});

