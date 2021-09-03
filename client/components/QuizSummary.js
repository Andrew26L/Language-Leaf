import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import history from '../history'
import { updateUserScore } from '../store/score';

class QuizSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    this.props.updateUserScore(this.props.score)
  }
  handleNext(event) {
    history.push('/')
  }
  render() {
    return (
      <div className="leaf">
        <h1>Quiz Completed!</h1>
        <h1>🏆</h1>
        <h2>{`Score: ${this.props.score}`}</h2>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleNext}>
          Next
        </Button>
        <div></div>
    </div>
  )}
}

const mapState = (state) => {
  return {
    quizStatus: state.quizStatus,
    score: state.score
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserScore: (score) => {dispatch(updateUserScore(score))},
  }
}

export default connect(mapState, mapDispatch)(QuizSummary);
