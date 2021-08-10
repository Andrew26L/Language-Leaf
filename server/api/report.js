const router = require('express').Router();
const submitReport = require('../adminBot');

router.post('/:type', async (req, res, next) => {
  try {
    const instance = await submitReport(req.params.type, req.body._id, req.body.language, req.body.guess);
    res.send(instance);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
