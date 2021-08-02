const router = require('express').Router();
const menuController = require('./controller');
const {
  adminAuthValidation,
  userAuthValidation,
} = require('../middleware/authValidation');
const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createMenuValidationSchema,
  menuIdValidationSchema,
} = require('../middleware/bodyValidation/menuValidation');

router.post(
  '/',
  adminAuthValidation,
  createMenuValidationSchema,
  validationResults,
  menuController.createMenu
);
router.get('/', userAuthValidation, menuController.getMenus);
router.delete(
  '/:_id',
  adminAuthValidation,
  menuIdValidationSchema,
  validationResults,
  menuController.deleteMenu
);

module.exports = router;
