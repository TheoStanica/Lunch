const router = require('express').Router();

const { validationResults } = require('../middleware/bodyValidation/index');

const { userAuthValidation } = require('../middleware/authValidation');

const deviceController = require('./controller');

router.post(
  '/',
  userAuthValidation,
  //body validation for fcmToken
  validationResults,
  deviceController.createDevice
);

module.exports = router;
