const router = require('express').Router();
const { User } = require('../db');

// Get the total score of the current user
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send({score: user.score});
  } catch (error) {
    next(error);
  }
});

// Update the total score of the current user
router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    user.score = req.body.score
    await user.save()
    res.send({score: user.score});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
