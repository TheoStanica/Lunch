const router = require('express').Router();

const { authValidation } = require('../middleware/authValidation');
const {
  loginValidationSchema,
  registerValidationSchema,
  forgotPasswordValidationSchema,
  updateValidationSchema,
  validationResults,
} = require('../middleware/bodyValidation/userValidation');

const userController = require('./controller');

router.get('/activate/:_activationToken', userController.activateAccount);
router.get('/', authValidation, userController.getUser);

router.post('/login', loginValidationSchema, userController.login);
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
  '/:_userId?',
  updateValidationSchema,
  validationResults,
  userController.updateUser
);

module.exports = router;
