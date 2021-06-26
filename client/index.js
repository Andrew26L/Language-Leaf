import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './store';
import '../public/index.css';
import history from './history';

import Main from './components/Main'

// Note - Consider using BrowserRouter instead of Router

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
