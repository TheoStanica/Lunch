const router = require('express').Router();

const { authValidation } = require('../middleware/authValidation');
const {
  isUserValid,
  isPasswordValid,
  validationResults,
} = require('../middleware/bodyValidation');

const userController = require('./controller');

router.get('/activate/:_activationToken', userController.activateAccount);
router.get('/', authValidation, userController.getUser);

router.post('/login', userController.login);
router.post(
  '/register',
  isUserValid,
  validationResults,
  userController.register
);
router.post('/refresh', userController.refreshTokens);
router.post(
  '/forgotpassword/:_token?',
  isPasswordValid,
  validationResults,
  userController.forgotPassword
);

module.exports = router;
