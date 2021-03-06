const mongoose = require('mongoose');
const reportsSchema = require('./Report');

const wordSchema = new mongoose.Schema({
  english: [String],
  german: [String],
  imageUrl: String,
  type: {
    type: String,
    enum: ['noun','verb','adjective','exclamation']
  },
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

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
