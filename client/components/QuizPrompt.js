import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { toggleSubmitStatus, setGuess } from '../store/quizStatus'

class QuizPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      promptLang: 'enlish',
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
    event.preventDefault();
    setGuess(this.state.guess, this.state.translateLang);
    toggleSubmitStatus(true);

  }
  async handleChange(event) {
    await this.setState({
      guess: event.target.value
    })
  }
  render() {
    const { question } = this.props.quizStatus || 0;
    const { promptLang, translationLang } = this.state
    const prompt = this.props.quiz[question] ? this.props.quiz[question][promptLang][0] : '';
    return (
      <div className="container-sm">
      <h3>Score: {score}</h3>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="mb-3 row">
            <label htmlFor="prompt" className="form-label">{`In ${promptLang}:`}</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control" id="prompt" value={prompt}/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="userTranslation" className="form-label">{`Translate to ${translationLang}:`}</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="userTranslation"
                placeholder={translationLang}
                value={this.state.guess}
                onChange={this.handleChange}/>
            </div>
          </div>
          <Button variant="contained" color="primary">Submit</Button>
          <br /><br />
        </form>
    </div>
  )}
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    quizStatus = state.quizStatus
  }
}

export default connect(mapState)(QuizPrompt);
