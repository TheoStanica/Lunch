const router = require('express').Router();

const { authValidation } = require('../middleware/authValidation');
const {
  isUserValid,
  validationResults,
} = require('../middleware/bodyValidation');

const userController = require('./controller');

router.get('/activate/:_activationToken', userController.activateAccount);

router.post('/login', userController.login);
router.post(
  '/register',
  isUserValid,
  validationResults,
  userController.register
);
router.post('/refresh', userController.refreshTokens);

module.exports = router;
