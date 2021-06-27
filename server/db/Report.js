const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['english', 'german']
  },
  sentence: String,
  reports: Number
})

module.exports = reportsSchema;
