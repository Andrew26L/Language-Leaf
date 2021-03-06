import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { incrementQuestion, toggleSubmitStatus, quizCompleted, toggleReport } from '../store/quizStatus';
import { incrementScore } from '../store/score';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class QuizCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: true
    }
    this.handleReport = this.handleReport.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    const { lang, guess, question } = this.props.quizStatus || '';
    const solutions = this.props.quiz[question][lang] || [];
    if (solutions.includes(guess)) {
      this.props.incrementScore();
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
    this.props.toggleReport(true);
  }
  handleNext(event) {
    if (this.props.quizStatus.question === this.props.quiz.length - 1) {
      this.props.quizCompleted(true);
      this.props.toggleSubmitStatus(false);
    } else {
      this.props.incrementQuestion();
      this.props.toggleSubmitStatus(false);
    }
  }
  render() {
    return (
      <div>
        {this.state.correct ?
          (
            <div className="leaf">
              <h5 id="info-bubble"><CheckIcon /></h5>
              <div className="leaf-container">
                <div></div>
                <h1>CORRECT!</h1>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleNext}
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <div className="leaf">
              <h5 id="info-bubble"><ErrorOutlineIcon /></h5>
              <div className="leaf-container">
                <div></div>
                <h1>Incorrect</h1>
                <div>
                  <h5>{`Your Answer: ${this.props.quizStatus.guess}`}</h5>
                  <h5>{`Correct Answer: ${this.props.quiz[this.props.quizStatus.question][this.props.quizStatus.lang][0]}`}</h5>
                </div>
                <div className="buttonContainer">
                  <Button
                    variant="outlined"
                    color="error"
                    type="button"
                    onClick={this.handleReport}>
                    Report
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleNext}
                    endIcon={<NavigateNextIcon />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )
        }
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
    incrementScore: () => {dispatch(incrementScore())},
    incrementQuestion: () => {dispatch(incrementQuestion())},
    toggleSubmitStatus: (bool) => {dispatch(toggleSubmitStatus(bool))},
    quizCompleted: (bool) => {dispatch(quizCompleted(bool))},
    toggleReport: (bool) => {dispatch(toggleReport(bool))},
  }
}

export default connect(mapState, mapDispatch)(QuizCheck);
