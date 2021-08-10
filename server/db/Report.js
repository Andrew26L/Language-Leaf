const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['english', 'german']
  },
  guess: String,
})

module.exports = reportsSchema;
