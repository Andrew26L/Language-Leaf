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

// Replaced with report API
// router.put('/', async (req, res, next) => {
//   try {
//     const sentence = await Sentence.findById(req.body._id);
//     sentence[req.body.lang].push(req.body.guess);
//     await sentence.save();
//     res.send(sentence);
//   } catch (error) {
//     next(error);
//   }
// })

module.exports = router;
