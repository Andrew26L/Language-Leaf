import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { verifyMe } from './store/auth';
import Home from './components/Home';
import Quiz from './components/Quiz';
import { Login, Signup } from './components/AuthForm';


class Routes extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/quiz" component={Quiz} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth._id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUser() {
      dispatch(verifyMe());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));
