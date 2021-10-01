import React from 'react';
import {render, screen} from "@testing-library/react";

import Login from '../pages/login.component';

it("should render Login ", () => {
    render(<Login />);

    const login = screen.getAllByText('Login');
    expect(login[0]).toBeInTheDocument();
})

it("should render input with placeholder Email ", () => {
    render(<Login />);

    const inputNode = screen.getByPlaceholderText('Email');
    expect(inputNode).toBeTruthy();
})

it("should render input with placeholder Password ", () => {
    render(<Login />);

    const inputNode = screen.getByPlaceholderText('Password');
    expect(inputNode).toBeTruthy();
})