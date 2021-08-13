const router = require('express').Router();

const {
  userAuthValidation,
  adminAuthValidation,
} = require('../middleware/authValidation');
const {
  loginValidationSchema,
  registerValidationSchema,
  forgotPasswordValidationSchema,
  updateValidationSchema,
  userIdValidationSchema,
  optionalUserIdValidationSchema,
} = require('../middleware/bodyValidation/userValidation');
const { validationResults } = require('../middleware/bodyValidation/index');

const userController = require('./controller');

router.get('/activate/:_activationToken', userController.activateAccount);
router.get('/all', adminAuthValidation, userController.getAllUsers);
router.get(
  '/:_userId?',
  userAuthValidation,
  optionalUserIdValidationSchema,
  validationResults,
  userController.getUser
);

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
  '/:_userId?',
  userAuthValidation,
  updateValidationSchema,
  optionalUserIdValidationSchema,
  validationResults,
  userController.updateUser
);

router.delete(
  '/:_userId',
  adminAuthValidation,
  userIdValidationSchema,
  validationResults,
  userController.deleteUser
);

module.exports = router;
