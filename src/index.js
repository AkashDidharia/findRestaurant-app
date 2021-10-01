import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer/redux";
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import placesSaga from './sagas/placesSaga';


//intitialize the saga middleware
const sagaMiddleware = createSagaMiddleware()

//store of redux
let store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(placesSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>,   
  document.getElementById('root')
);

