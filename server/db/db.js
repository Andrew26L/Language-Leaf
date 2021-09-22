// const mongoose = require('mongoose').set('debug', true);
const mongoose = require('mongoose');

// Check if running in prod env with cloud configuration
if (process.env.MONGODB_ATLAS_URI) {
  mongoose.connect(process.env.MONGODB_ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
} else {
  // Check if running test env or dev env
  mongoose.connect(process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/language-translator-test' : 'mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Database Connected Successfully')
  }
})

module.exports = db;
