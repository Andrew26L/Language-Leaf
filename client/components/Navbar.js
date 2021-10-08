import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

const Navbar = ({isLoggedIn, handleClick}) => {
  return (
    <AppBar position="static" style={{backgroundColor: "#2b2e27"}}>
      <Toolbar className="topBar">
        <Typography variant="h6">
        🌱 Language Leaf
        </Typography>
        {isLoggedIn ? (
          <div>
            <Button color="inherit" onClick={handleClick}>Logout</Button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="navButton">
            <Button color="inherit">Log In</Button>
            </Link>
            <Link to="/signup" className="navButton">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth._id
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
