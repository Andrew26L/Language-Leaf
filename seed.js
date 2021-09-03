const { Word, Sentence } = require('./server/db');
const mongoose = require('mongoose');

const words = [
  {
    english: 'hello',
    german: 'hallo',
    type: 'exclamation'
  },
  {
    english: 'room',
    german: 'Zimmer',
    type: 'noun'
  },
  {
    english: 'morning',
    german: 'Morgen',
    type: 'noun'
  },
  {
    english: 'street',
    german: 'Strasse',
    type: 'noun'
  },
  {
    english: 'bread',
    german: 'Brot',
    type: 'noun'
  },
  {
    english: 'house',
    german: 'Haus',
    type: 'noun'
  },
  {
    english: 'dog',
    german: 'Hund',
    type: 'noun'
  },
  {
    english: 'cat',
    german: 'Katze',
    type: 'noun'
  },
  {
    english: 'live',
    german: 'wohnen',
    type: 'verb'
  },
  {
    english: 'eat',
    german: 'essen',
    type: 'verb'
  },
  {
    english: 'run',
    german: 'laufen',
    type: 'verb'
  },
  {
    english: 'airplane',
    german: 'Flugzeug',
    type: 'noun'
  },
  {
    english: 'buy',
    german: 'kaufen',
    type: 'verb'
  },
  {
    english: 'give',
    german: 'geben',
    type: 'verb'
  },
  {
    english: 'cold',
    german: 'kalt',
    type: 'adjective'
  },
  {
    english: 'sell',
    german: 'verkaufen',
    type: 'verb'
  },
  {
    english: 'time',
    german: 'Zeit',
    type: 'noun'
  },
  {
    english: 'apple',
    german: 'Apfel',
    type: 'noun'
  },
  {
    english: 'have',
    german: 'haben',
    type: 'verb'
  },
  {
    english: 'need',
    german: 'brauchen',
    type: 'verb'
  }
]

const sentences = [
  {
    english: `I'm from Japan`,
    german: `Ich komme aus Japan`
  },
  {
    english: 'We are going to the movies',
    german: 'Wir gehen ins Kino'
  },
  {
    english: 'What time is it?',
    german: 'Wie viel Uhr ist es?'
  },
  {
    english: 'Where is the airport?',
    german: 'Wo ist der Flughafen?'
  },
  {
    english: 'Good morning',
    german: 'Guten Morgen'
  },
  {
    english: 'I play tennis',
    german: 'Ich spiele Tennis'
  },
  {
    english: 'The apple is red',
    german: 'Der Apfel ist rot'
  },
  {
    english: 'The dog is small',
    german: 'Der Hund ist klein'
  },
  {
    english: 'My grandmother is from Ireland',
    german: 'Meine Oma kommt aus Irland'
  },
  {
    english: 'It is sunny',
    german: 'Es ist sonnig'
  },
]

async function seed() {
  for (let i = 0; i < words.length; i++) {
    const currentWord = new Word(words[i])
    await currentWord.save(function(err, currentWord) {
      if (err) {
        return console.error(err);
      }
    })
  }
  for (let i = 0; i < sentences.length; i++) {
    const currentSentence = new Sentence(sentences[i])
    await currentSentence.save(function(err, currentSentence) {
      if (err) {
        return console.error(err);
      }
    })
  }
}

async function runSeed() {
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URI || process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/language-translator-test' : 'mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Database Connected Successfully')
  }
})
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function() {
    await Sentence.deleteMany({});
    await Word.deleteMany({});
    await seed();
    if (process.env.NODE_ENV !== 'test') {
      console.log('Database Seeded Successfully')
    }
  })
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
