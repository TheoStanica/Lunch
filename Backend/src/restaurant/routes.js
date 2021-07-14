const router = require('express').Router();
const restaurantController = require('./controller');
const { authValidation } = require('../middleware/authValidation');
const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createRestaurantValidationSchema,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
} = require('../middleware/bodyValidation/restaurantValidation');

router.post(
  '/',
  authValidation,
  createRestaurantValidationSchema,
  validationResults,
  restaurantController.createRestaurant
);
router.get('/', restaurantController.getAllRestaurants);
router.get(
  '/:_id',
  authValidation,
  restaurantIdValidationSchema,
  validationResults,
  restaurantController.getRestaurant
);
router.put(
  '/:_id',
  authValidation,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
  validationResults,
  restaurantController.updateRestaurant
);
router.delete(
  '/:_id',
  authValidation,
  restaurantIdValidationSchema,
  validationResults,
  restaurantController.deleteRestaurant
);

module.exports = router;
