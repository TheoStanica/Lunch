const router = require('express').Router();
const menuController = require('./controller');
const { adminAuthValidation } = require('../middleware/authValidation');
const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createMenuValidationSchema,
  updateMenuValidationSchema,
  menuIdValidationSchema,
} = require('../middleware/bodyValidation/menuValidation');

router.post(
  '/',
  adminAuthValidation,
  createMenuValidationSchema,
  validationResults,
  menuController.createMenu
);
router.put(
  '/:_id',
  adminAuthValidation,
  updateMenuValidationSchema,
  validationResults,
  menuController.updateMenu
);
router.get('/', adminAuthValidation, menuController.getMenus);
router.delete(
  '/:_id',
  adminAuthValidation,
  menuIdValidationSchema,
  validationResults,
  menuController.deleteMenu
);

module.exports = router;
