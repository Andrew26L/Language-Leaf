const router = require('express').Router();
const { User } = require('../db');
const mongoose = require('mongoose');
// const { db } = require('../db')

// mongoose.connect('mongodb://localhost:27017/language-translator', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;

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
    console.log('reached post api route')
    const user = new User(req.body);
    console.log('signup api', user)
    await user.save(function(error, user) {
      if (error) {
        console.log(error)
        return console.error(error);
      }
    })
    console.log(user)
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
    console.log('me route', user)
    res.send(user);
  } catch (error) {
      next(error);
  }
})

module.exports = router;
