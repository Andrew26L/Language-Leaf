const mongoose = require('mongoose');
const reportsSchema = require('./Report');

const sentenceSchema = new mongoose.Schema({
  english: [String],
  german: [String],
  correct: {
    type: Number,
    default: 0
  },
  incorrect: {
    type: Number,
    default: 0
  },
  reports: [reportsSchema]
})

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
