const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));

app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
