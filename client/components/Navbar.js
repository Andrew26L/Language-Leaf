import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import { makeStyles } from '@material-ui/core'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

const useStyles = makeStyles(theme => ({
  green: {
    backgroundColor: "#2b2e27"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = ({isLoggedIn, handleClick}) => {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{backgroundColor: "#2b2e27"}}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        🌱 Language Leaf
        </Typography>
        {isLoggedIn ? (
          <div id="navDiv">
            <Button color="inherit" onClick={handleClick}>Logout</Button>
          </div>
        ) : (
          <div id="navDiv">
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
