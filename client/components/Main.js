import React from 'react';
import {Route} from 'react-router-dom';

import {Signup, Login} from './AuthForm';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h5>Sign Up</h5>
        <Signup />
        <h5>Log In</h5>
        <Login />
      </div>
    )
  }
}

export default Main;
