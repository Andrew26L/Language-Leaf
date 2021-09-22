const router = require('express').Router();

// API routes
router.use('/words', require('./words'));
router.use('/sentences', require('./sentences'));
router.use('/report', require('./report'));
router.use('/score', require('./score'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
})

module.exports = router;
