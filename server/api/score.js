const router = require('express').Router();
const { User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send({score: user.score});
  } catch (error) {
    next(error);
  }
});

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
