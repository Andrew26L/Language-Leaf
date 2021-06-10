import React from 'react';
import axios from 'axios';

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordNumber = 0,
      word = {}
    }
    this.getWord = this.getWord.bind(this);
  }
  componentDidMount() {
    this.getWord();
  }
  async getWord() {
    const word = await axios.get(`/api/translate/${this.state.wordNumber}`)
    await this.setState({
      word,
      wordNumber: this.state.wordNumber + 1
    })
  }
  render() {
    const word = this.state.word || {};
    return (
      <div>
        <h5>Word: {this.state.word.english}</h5>
      </div>
    )
  }
}
