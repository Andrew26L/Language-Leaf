import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { incrementQuestion, toggleSubmitStatus, quizCompleted } from '../store/quizStatus';

class QuizCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: false
    }
    this.handleReport = this.handleReport.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    const { lang, guess, question } = this.props.quizStatus || '';
    const solutions = this.props.quiz[question][lang] || [];
    if (solutions.includes(guess)) {
      this.setState({
        correct: true
      })
    } else {
      this.setState({
        correct: false
      })
    }
  }
  handleReport(event) {
    console.log('reported')
  }
  handleNext(event) {
    if (this.props.quizStatus.question === this.props.quiz.length - 1) {
      this.props.quizCompleted(true);
    } else {
      this.props.incrementQuestion();
      this.props.toggleSubmitStatus(false);
    }
  }
  render() {
    return (
      <div className="container-sm">
        {this.state.correct ?
          (
            <div>CORRECT!!</div>
          ) : (
            <div>Incorrect.</div>
          )
        }
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleReport}>
          Report
        </Button>
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
    quiz: state.quiz,
    quizStatus: state.quizStatus
  }
}

const mapDispatch = (dispatch) => {
  return {
    incrementQuestion: () => {dispatch(incrementQuestion())},
    toggleSubmitStatus: (bool) => {dispatch(toggleSubmitStatus(bool))},
    quizCompleted: (bool) => {dispatch(quizCompleted(bool))},
  }
}

export default connect(mapState, mapDispatch)(QuizCheck);
