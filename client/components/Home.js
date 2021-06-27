import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import history from '../history';
import { resetQuiz, quizCompleted } from '../store/quizStatus'

class Home extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.resetQuiz();
    this.props.quizCompleted(false);
    history.push('/quiz');
  }
  render() {
    return (
      <div className="homeCard">
        <div>
          <h1>Welcome</h1>
          <h3>to</h3>
          <h1>Language Leaf</h1>
        </div>
        <h3>Your Progress: 1,230 Points</h3>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={this.handleClick}>
          Begin Next Quiz
        </Button>
        <div></div>
        <div></div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetQuiz: () => {dispatch(resetQuiz())},
    quizCompleted: (bool) => {dispatch(quizCompleted(bool))},
  }
}

export default connect(null, mapDispatch)(Home);
