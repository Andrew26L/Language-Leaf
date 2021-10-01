import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import history from '../history';
import { resetQuiz, quizCompleted } from '../store/quizStatus';
import { fetchUserScore } from '../store/score';

class Home extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserScore();
  }
  handleClick() {
    this.props.resetQuiz();
    this.props.quizCompleted(false);
    history.push('/quiz');
  }
  render() {
    return (
      <div className="leaf">
        <div className="leaf-container">
          <div>
            <h1>Welcome</h1>
            <h3>to</h3>
            <h1>Language Leaf</h1>
          </div>
          <div>
            <h3>You're Learning  🇩🇪 </h3>
            <h3>{`Score: ${this.props.score}`}</h3>
          </div>
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
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    score: state.score
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetQuiz: () => {dispatch(resetQuiz())},
    quizCompleted: (bool) => {dispatch(quizCompleted(bool))},
    fetchUserScore: () => {dispatch(fetchUserScore())}
  }
}

export default connect(mapState, mapDispatch)(Home);
