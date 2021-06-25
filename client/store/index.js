import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';

const reducer = combineReducers({
  auth
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(
  reducer,
  middleware
);






