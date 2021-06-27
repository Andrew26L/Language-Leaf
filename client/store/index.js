import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import quiz from './quiz';
import score from './score';
import quizStatus from './quizStatus';

const reducer = combineReducers({
  auth,
  quiz,
  quizStatus,
  score
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(
  reducer,
  middleware
);






