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

module.exports = router;
