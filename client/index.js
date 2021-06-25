import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './store';
import '../public/index.css';

import Main from './components/Main'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
