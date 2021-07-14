const router = require('express').Router();
const restaurantController = require('./controller');
const { adminAuthValidation } = require('../middleware/authValidation');
const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createRestaurantValidationSchema,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
} = require('../middleware/bodyValidation/restaurantValidation');

router.post(
  '/',
  adminAuthValidation,
  createRestaurantValidationSchema,
  validationResults,
  restaurantController.createRestaurant
);
router.get('/', restaurantController.getAllRestaurants);
router.get(
  '/:_id',
  adminAuthValidation,
  restaurantIdValidationSchema,
  validationResults,
  restaurantController.getRestaurant
);
router.put(
  '/:_id',
  adminAuthValidation,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
  validationResults,
  restaurantController.updateRestaurant
);
router.delete(
  '/:_id',
  adminAuthValidation,
  restaurantIdValidationSchema,
  validationResults,
  restaurantController.deleteRestaurant
);

module.exports = router;
