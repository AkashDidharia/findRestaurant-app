import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/navbar.component';

test('renders Brand Name', () => {
    render(
    <BrowserRouter>
        <NavBar />
    </BrowserRouter>
    );
    const brandNameElement = screen.getAllByText('GoodFood');
    expect(brandNameElement[0]).toBeInTheDocument();
});

