import React from 'react';
import {connect} from 'react-redux';
import {authenticate} from '../store/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom';

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props;
  return (
    <div className="authForms">
      <h1>{displayName}</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <TextField
            name="username"
            type="text"
            label="Username"
            variant="outlined"
            fullWidth={true} />
        </div>
        <br />
        <div>
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth={true} />
        </div>
        <br />
        <div>
          <Button variant="outlined" color="primary" type="submit">{displayName}</Button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
      {displayName === 'Login' ? <h5>New to Language Leaf? <Link to ="signup">Sign up</Link></h5> : <h5>Already registered? <Link to="/login">Log in</Link></h5>}
    </div>
  )
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const formName = event.target.name;
      const username = event.target.username.value;
      const password = event.target.password.value;
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
