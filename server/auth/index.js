const router = require('express').Router();
const { User } = require('../db');
const mongoose = require('mongoose');

router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    if (!token) {
      res.sendStatus(404);
    } else {
      res.send({token});
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.send({token})
  } catch (error) {
      console.log(error)
      next(error);
  }
})

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    res.send(user);
  } catch (error) {
      next(error);
  }
})

module.exports = router;
