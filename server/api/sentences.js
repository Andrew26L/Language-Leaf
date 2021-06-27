const router = require('express').Router();
const { Sentence } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const sentences = await Sentence.aggregate(
      [ { $sample: {size: 4 } }]
    )
    res.send(sentences);
  } catch (error) {
    next(error);
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const sentence = await Sentence.findById(req.body._id);
    console.log(sentence)
    sentence[req.body.lang].push(req.body.guess);
    await sentence.save();
    res.send(sentence);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
