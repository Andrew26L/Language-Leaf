const {Word} = require('./server/db');
const mongoose = require('mongoose');

const words = [
  {
    english: 'hello',
    german: 'hallo'
  },
  {
    english: 'room',
    german: 'Zimmer'
  },
  {
    english: 'morning',
    german: 'Morgen'
  },
  {
    english: 'street',
    german: 'Strasse'
  },
  {
    english: 'bread',
    german: 'Brot'
  },
  {
    english: 'house',
    german: 'Haus'
  },
  {
    english: 'dog',
    german: 'Hund'
  },
  {
    english: 'cat',
    german: 'Katze'
  },
  {
    english: 'live',
    german: 'wohnen'
  },
  {
    english: 'eat',
    german: 'essen'
  },
  {
    english: 'run',
    german: 'laufen'
  },
  {
    english: 'airplane',
    german: 'Flugzeug'
  },
  {
    english: 'buy',
    german: 'kaufen'
  },
  {
    english: 'give',
    german: 'geben'
  },
  {
    english: 'cold',
    german: 'kalt'
  },
  {
    english: 'sell',
    german: 'verkaufen'
  },
  {
    english: 'time',
    german: 'Zeit'
  },
  {
    english: 'apple',
    german: 'Apfel'
  },
  {
    english: 'have',
    german: 'haben'
  },
  {
    english: 'need',
    german: 'brauchen'
  }
]

function seed() {
  for (let i = 0; i < words.length; i++) {
    const currentWord = new Word(words[i])
    currentWord.save(function(err, currentWord) {
      if (err) {
        return console.error(err);
      }
    })
  }
}

mongoose.connect('mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected Successfully')
  seed();
})


