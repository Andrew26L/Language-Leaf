import React from 'react';
import {Route} from 'react-router-dom';

import {Signup, Login} from './AuthForm';
import {Quiz} from './Quiz';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Quiz />
      </div>
    )
  }
}

export default Main;
