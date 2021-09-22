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

// Replaced with Report API
// router.put('/', async (req, res, next) => {
//   try {
//     const word = await Word.findById(req.body._id);
//     word[req.body.lang].push(req.body.guess);
//     await word.save();
//     res.send(word);
//   } catch (error) {
//     next(error);
//   }
// })

module.exports = router;
