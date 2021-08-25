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
  filterMenuValidationSchema,
} = require('../middleware/bodyValidation/menuValidation');

router.post(
  '/',
  adminAuthValidation,
  createMenuValidationSchema,
  validationResults,
  menuController.createMenu
);

router.get(
  '/',
  userAuthValidation,
  filterMenuValidationSchema,
  validationResults,
  menuController.getMenus
);

router.delete(
  '/:_id',
  adminAuthValidation,
  menuIdValidationSchema,
  validationResults,
  menuController.deleteMenu
);

router.post(
  '/notify/:_id',
  adminAuthValidation,
  menuIdValidationSchema,
  validationResults,
  menuController.notifyMenu
);

module.exports = router;
