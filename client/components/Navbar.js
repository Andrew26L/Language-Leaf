import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Navbar extends React.Component {
  render() {
    console.log(this.props.isLoggedIn)
    return (
      <AppBar position="static">
        <ToolBar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
        <h1>Language Leaf</h1>
          {this.props.isLoggedIn ? (
            <div id="navDiv">
              <a href="#" onClick={this.props.handleClick}>Logout</a>
            </div>
          ) : (
            <div id="navDiv">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </ToolBar>
      </AppBar>
    )
  }
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
