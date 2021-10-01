import React from 'react';
import {render, screen} from "@testing-library/react";

import SignUp from '../pages/signup.component';

it("should render Register Header ", () => {
    render(<SignUp />);
    const login = screen.getAllByText('Register');
    expect(login[0]).toBeInTheDocument();
})

it("should render input with placeholder First Name ", () => {
    render(<SignUp />);
    const inputNode = screen.getByPlaceholderText('FirstName');
    expect(inputNode).toBeTruthy();
})

it("should render input with placeholder LastName ", () => {
    render(<SignUp />);
    const inputNode = screen.getByPlaceholderText('LastName');
    expect(inputNode).toBeTruthy();
})

it("should render input with placeholder Email ", () => {
    render(<SignUp />);
    const inputNode = screen.getByPlaceholderText('Email');
    expect(inputNode).toBeTruthy();
})

it("should render input with placeholder Password ", () => {
    render(<SignUp />);
    const inputNode = screen.getByPlaceholderText('Password');
    expect(inputNode).toBeTruthy();
})