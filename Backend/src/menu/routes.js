const router = require('express').Router();
const menuController = require('./controller');
const { adminAuthValidation } = require('../middleware/authValidation');
const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createMenuValidationSchema,
  updateMenuValidationSchema,
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
  updateMenuValidationSchema,
  validationResults,
  menuController.updateMenu
);
router.delete('/:_id', menuController.deleteMenu);

module.exports = router;
