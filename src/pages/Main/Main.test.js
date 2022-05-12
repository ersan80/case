import React from "react";
import {render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Main from "./Main";

jest.mock('../../context/Context', () => ({
    useGlobalContext: () => [jest.fn(), jest.fn()]
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => [jest.fn()]
}));

test("Main renders correctly", () => {
    const {getByTestId} = render(<Main/>)
    expect(getByTestId('main-container')).toBeInTheDocument()
})
