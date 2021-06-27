import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import history from '../history'

class QuizSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
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

export default connect(mapState)(QuizSummary);
