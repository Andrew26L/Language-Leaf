const router = require('express').Router();
const { Word } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const words = await Word.aggregate(
      [ { $sample: {size: 4 } }]
    )
    res.send(words);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
