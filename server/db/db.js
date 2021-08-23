// const Sequelize = require('sequelize');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URI || 'mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
