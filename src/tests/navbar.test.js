import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/navbar.component';

test('renders Brand Name', () => {
    render(<NavBar />);
    const linkElement = screen.getByText('GoodFood');
    expect(linkElement).toBeInTheDocument();
});

