const db = require('./db');
const User = require('./User');
const Word = require('./Word');
const Sentence = require('./Sentence');

//Associations

module.exports = {
  db,
  User,
  Word,
  Sentence
}
