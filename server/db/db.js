// const Sequelize = require('sequelize');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URI || process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/language-translator-test' : 'mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Database Connected Successfully')
  }
})

module.exports = db;
