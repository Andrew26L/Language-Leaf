import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { incrementQuestion, toggleSubmitStatus, quizCompleted, toggleReport } from '../store/quizStatus';
import { addReport } from '../store/quiz';

class QuizCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  handleCancel(event) {
    this.handleNext();
  }
  handleSubmit(event) {
    const { question, guess, lang } = this.props.quizStatus;
    const currentQuiz = this.props.quiz[question];
    this.props.addReport(currentQuiz, guess, lang);
    this.handleNext();
  }
  handleNext(event) {
    if (this.props.quizStatus.question === this.props.quiz.length - 1) {
      this.props.quizCompleted(true);
      this.props.toggleSubmitStatus(false);
    } else {
      this.props.incrementQuestion();
      this.props.toggleSubmitStatus(false);
    }
    this.props.toggleReport(false);
  }
  render() {
    return (
      <div className="leaf">
        <div className="leaf-container">
          <h1>Submit a Report</h1>
          <div>
            <h5>{`Your Answer: ${this.props.quizStatus.guess}`}</h5>
            <h5>{`Correct Answer: ${this.props.quiz[this.props.quizStatus.question][this.props.quizStatus.lang][0]}`}</h5>
          </div>
          <h4>What are you reporting?</h4>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleSubmit}>
            My answer is correct
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleCancel}
            >
            The solution is incorrect
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleCancel}>
            Cancel
          </Button>
          <div></div>
        </div>
    </div>
  )}
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    quizStatus: state.quizStatus
  }
}

const mapDispatch = (dispatch) => {
  return {
    incrementQuestion: () => {dispatch(incrementQuestion())},
    toggleSubmitStatus: (bool) => {dispatch(toggleSubmitStatus(bool))},
    quizCompleted: (bool) => {dispatch(quizCompleted(bool))},
    toggleReport: (bool) => {dispatch(toggleReport(bool))},
    addReport: (quiz, guess, lang) => {dispatch(addReport(quiz, guess, lang))},
  }
}

export default connect(mapState, mapDispatch)(QuizCheck);
