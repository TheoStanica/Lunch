const router = require('express').Router();

const { validationResults } = require('../middleware/bodyValidation/index');

const { userAuthValidation } = require('../middleware/authValidation');

const notificationController = require('./controller');

router.get(
  '/',
  userAuthValidation,
  validationResults,
  notificationController.getNotifications
);

module.exports = router;
