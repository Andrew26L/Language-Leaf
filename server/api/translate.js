const router = require('express').Router();
const {Word} = require('../db');
const mongoose = require('mongoose');

router.get('/:wordNumber', async (req, res, next) => {
  try {
    console.log('attempt to find word in database')
    const word = await Word.findOne().skip(Number(req.params.wordNumber));
    res.send(word)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
