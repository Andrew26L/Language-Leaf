import React from 'react';
import axios from 'axios';

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordNumber: 0,
      word: {},
      message: '',
      guess: '',
      score: 0
    }
    this.getWord = this.getWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getWord();
  }
  async getWord() {
    const res = await axios.get(`/api/translate/${this.state.wordNumber}`)
    console.log('getWord --> ', res.data)
    await this.setState({
      word: res.data,
      wordNumber: this.state.wordNumber + 1
    })
  }
  async handleChange(event) {
    await this.setState({
      message: '',
      guess: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.word.english)
    console.log(this.state.guess)
    if (this.state.guess === this.state.word.english) {
      await this.setState({
        message: 'Correct!',
        guess: '',
        score: this.state.score + 1
      })
      await this.getWord();
    } else {
      await this.setState({
        message: `Sorry, that's incorrect`
      })
    }
  }
  render() {
    const word = this.state.word || {};
    console.log(this.state);
    return (
      <div className="quiz">
        <div className="container-sm">
          <h1>Learn German</h1>
          <h3>Score: {this.state.score}</h3>
          <form onSubmit={this.handleSubmit} className="form-group">
            <div className="mb-3 row">
              <label htmlFor="germanWord" className="form-label">German Word:</label>
              <div className="col-sm-10">
                <input type="text" readOnly className="form-control" id="germanWord" value={this.state.word.german || ""}/>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="englishWord" className="form-label">English Word:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="englishWord" value={this.state.guess} onChange={this.handleChange}/>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-dark">Submit</button>
            <br /><br />
            <label className="form-label">{this.state.message}</label>
          </form>
        </div>
      </div>
    )
  }
}
