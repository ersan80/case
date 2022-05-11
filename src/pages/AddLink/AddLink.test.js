import React from "react";
import {render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import Main from "./Main";
import AddLink from "./AddLink";

test("main renders correctly", ()=>{
    const {getByPlaceholderText, debug}=  render(<AddLink/>)

})