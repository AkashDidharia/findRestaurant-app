import React from 'react';
import ReactDOM from 'react-dom';
import {render} from "@testing-library/react";

import DiscoverButton from '../components/discoverButton.component';


it("CheckButtonRender", () => {
    const {getByText} =render(<DiscoverButton />);

    const linkElement =getByText('Discover food joints');
    expect(linkElement).toBeTruthy();
})