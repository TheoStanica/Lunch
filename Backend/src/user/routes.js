const router = require('express').Router();

const { authValidation } = require('../middleware/authValidation');
const {
  loginValidationSchema,
  registerValidationSchema,
  forgotPasswordValidationSchema,
  updateValidationSchema,
} = require('../middleware/bodyValidation/userValidation');
const { validationResults } = require('../middleware/bodyValidation/index');

const userController = require('./controller');

router.get('/activate/:_activationToken', userController.activateAccount);
router.get('/', authValidation, userController.getUser);

router.post(
  '/login',
  loginValidationSchema,
  validationResults,
  userController.login
);
router.post(
  '/register',
  registerValidationSchema,
  validationResults,
  userController.register
);
router.post('/refresh', userController.refreshTokens);
router.post(
  '/forgotpassword/:_token?',
  forgotPasswordValidationSchema,
  validationResults,
  userController.forgotPassword
);

router.put(
  '/',
  authValidation,
  updateValidationSchema,
  validationResults,
  userController.updateUser
);

module.exports = router;
