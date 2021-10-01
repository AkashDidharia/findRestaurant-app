import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen, fireEvent} from "@testing-library/react";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';
import { reducer } from '../reducer/redux';
import placesSaga from '../sagas/placesSaga';

import DiscoverButton from '../components/discoverButton.component';


it("should render Discover Food Joints", () => {
    const sagaMiddleWare = createSagaMiddleWare('saga');
    let store = createStore(reducer, applyMiddleware(sagaMiddleWare));
    sagaMiddleWare.run(placesSaga);
    render(
        <Provider store={store}>
            <BrowserRouter>
                <DiscoverButton />
            </BrowserRouter>
        </Provider>    
        );

    const discoverButton = screen.getByText('Discover food joints');
    fireEvent(discoverButton, new MouseEvent('click'));
    setTimeout(() => {
        const thead = screen.getByText('Rating');
        expect(thead).toBeInTheDocument();
    }, 5000);
    expect(discoverButton).toBeInTheDocument();
});
  