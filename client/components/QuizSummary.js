import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import history from '../history'
import { updateUserScore } from '../store/score';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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
        <div className="leaf-container">
          <h1>Quiz Completed!</h1>
          <h1><TaskAltIcon fontSize="large"/></h1>
          <h2>{`Score: ${this.props.score}`}</h2>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleNext}>
            Next
          </Button>
          <div></div>
        </div>
    </div>
  )}
}

const mapState = (state) => {
  return {
    quizStatus: state.quizStatus,
    score: state.score
  }
}

// Update current user's total score after completing quiz
const mapDispatch = (dispatch) => {
  return {
    updateUserScore: (score) => {dispatch(updateUserScore(score))},
  }
}

export default connect(mapState, mapDispatch)(QuizSummary);
