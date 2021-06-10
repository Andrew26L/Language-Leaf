const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  english: String,
  german: String
})

const Word = mongoose.model('Word', translationSchema);

module.exports = Word;
