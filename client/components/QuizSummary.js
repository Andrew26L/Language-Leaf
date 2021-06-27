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
      <div className="container-sm">
        <h2>Quiz Completed!</h2>
        <h1>🏆</h1>
        <h5>Score: 80</h5>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}>
          Next
        </Button>
    </div>
  )}
}

const mapState = (state) => {
  return {
    quizStatus: state.quizStatus
  }
}

export default connect(mapState)(QuizSummary);
