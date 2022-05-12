import React from "react";
import {render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import AddLink from "./AddLink";

jest.mock('../../context/Context', () => ({
    useGlobalContext: () => [jest.fn(), jest.fn()]
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => [jest.fn()]
}));

test("AddLink renders correctly", () => {
    const {getByTestId} = render(<AddLink/>)
    expect(getByTestId('link-header')).toHaveTextContent("Add New Link")
    expect(getByTestId('form')).toBeInTheDocument()
})