import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';

class Navbar extends React.Component {
  render() {
    console.log(this.props.isLoggedIn)
    return (
      <div>
        <h1>Language Leaf</h1>
        <nav>
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
        </nav>
        <br />
      </div>
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
