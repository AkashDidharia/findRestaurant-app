import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import placesSaga from '../sagas/placesSaga'
import reducer from '../reducer/redux';
const sagaMiddleware = createSagaMiddleware()

//INITIAL STATE OF THE APP

const initialState ={
  placesfetching: false,
  loggedIn:false,
  places: null,
  user: null,
  error: null,
  queryposting: false
}

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(logger, sagaMiddleware)
  )
  sagaMiddleware.run(placesSaga)
