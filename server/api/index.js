const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/translate', require('./translate'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
})

module.exports = router;
