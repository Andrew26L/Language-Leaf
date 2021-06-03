const router = require('express').Router();
const {User} = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({token: await user.generateToken()})
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error);
    }
  }
})

module.exports = router;
