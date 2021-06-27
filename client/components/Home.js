import React from 'react';
// import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import history from '../history';

export default class Home extends React.Component {
  constructor() {
    super()
    this.handleClick.bind(this);
  }
  handleClick() {
    history.push('/quiz');
  }
  render() {
    return (
      <div>
        <h5>Welcome to Language Leaf!</h5>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClick}>
          Begin Next Quiz
        </Button>
      </div>
    )
  }
}
