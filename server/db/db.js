// const Sequelize = require('sequelize');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected Successfully')
  const translationSchema = new mongoose.Schema({
    english: String,
    german: String,
    spanish: String,
    french: String
  })

  const Word = mongoose.model('Hello', translationSchema);

  const hello = new Word(
    {
      english: 'hello',
      german: 'hallo',
      spanish: 'hola',
      french: 'bonjour'
    }
  )

  hello.save(function(err, hello) {
    if (err) {
      return console.error(err);
    }
  })




})

module.exports = db;
