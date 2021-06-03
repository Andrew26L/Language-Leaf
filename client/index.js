import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import '../public/index.css'

import Main from './components/Main'

ReactDOM.render(
  <Provider store={store}>
    <div>Hello World, this is Andrew's application</div>
    <Main />
  </Provider>,
  document.getElementById('app')
);
