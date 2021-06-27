import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../store/quiz';
import QuizPrompt from './QuizPrompt';
import QuizCheck from './QuizCheck';
import QuizSummary from './QuizSummary';
import Report from './Report';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchQuiz();
  }
  render() {
    let { finishedQuiz, submittedGuess, report } = this.props.quizStatus;
    if (report) {
      return (
        <Report />
      )
    }
    if (!finishedQuiz) {
      return (
        !submittedGuess
        ?  <QuizPrompt />
        : <QuizCheck />
      )
    } else {
      return (
        <QuizSummary />
      )
    }
  }
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    quizStatus: state.quizStatus
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchQuiz: () => {dispatch(fetchQuiz())}
  }
}

export default connect(mapState, mapDispatch)(Quiz);
