import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { toggleSubmitStatus, setGuess } from '../store/quizStatus'
import { TextField, InputLabel } from '@material-ui/core/'

class QuizPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      promptLang: 'english',
      translateLang: 'german'
    }
    this.randomizeLanguage = this.randomizeLanguage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.randomizeLanguage();
  }
  randomizeLanguage() {
    let english = Math.round(Math.random());
    if (english) {
      this.setState({
        promptLang: 'english',
        translateLang: 'german'
      })
    } else {
      this.setState({
        promptLang: 'german',
        translateLang: 'english'
      })
    }
  }
  handleSubmit(event) {
    this.props.setGuess(this.state.guess, this.state.translateLang);
    this.props.toggleSubmitStatus(true);


  }
  async handleChange(event) {
    await this.setState({
      guess: event.target.value
    })
  }
  render() {
    let { question } = this.props.quizStatus || 0;
    let { promptLang, translateLang } = this.state;
    const prompt = this.props.quiz[question] ? this.props.quiz[question][promptLang][0] : '';
    if (!this.props.quiz.length) {
      return (
        <div>Loading Content</div>
      )
    }
    return (
      <div className="leaf">
        <h5 id="question-number">{`${question + 1} / 8`}</h5>
        <form onSubmit={this.handleSubmit} className="form-group">
          <h5>{`In ${promptLang}:`}</h5>
          <h2>{prompt}</h2>
          <br /><br />
          <TextField
            id="outlined-basic"
            fullWidth={true}
            label={translateLang}
            variant="outlined"
            value={this.state.guess}
            onChange={this.handleChange}/>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
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
    toggleSubmitStatus: (bool) => {dispatch(toggleSubmitStatus(bool))},
    setGuess: (guess, lang) => {dispatch(setGuess(guess, lang))}
  }
}

export default connect(mapState, mapDispatch)(QuizPrompt);
