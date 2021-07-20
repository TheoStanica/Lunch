const router = require('express').Router();

const {
  userAuthValidation,
  adminAuthValidation,
} = require('../middleware/authValidation');

const orderController = require('./controller');

module.exports = router;
