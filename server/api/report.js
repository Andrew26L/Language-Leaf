const router = require('express').Router();
const { Sentence } = require('../db');
const { Word } = require('../db');
const { submitReport } = require('../adminBot');

router.post('/#type', async (req, res, next) => {
  try {
    await submitReport('req.params.type', req.body.language, req.body.);
    const word = await Word.findById(req.body._id);

    word[req.body.lang].push(req.body.guess);
    await word.save();
    res.send(word);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
