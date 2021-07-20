const { check } = require('express-validator');
const { courseRequiredType } = require('../../utils/enums');

const createMenuValidationSchema = [
  check('restaurantId')
    .notEmpty()
    .withMessage('restaurantId is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurantId'),
  check('appetizer').notEmpty().withMessage('appetizer is required'),
  check('appetizer.*.description')
    .notEmpty()
    .withMessage('Please provide appetizer.description'),
  check('appetizer.*.requiredType')
    .optional()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage('Please provide a valid appetizer.requiredType'),
  check('mainCourse').notEmpty().withMessage('mainCourse is required'),
  check('mainCourse.*.description')
    .notEmpty()
    .withMessage('Please provide mainCourse.description'),
  check('mainCourse.*.requiredType')
    .optional()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage('Please provide a valid mainCourse.requiredType'),
  check('dessert').notEmpty().withMessage('dessert is required'),
  check('dessert.*.description')
    .notEmpty()
    .withMessage('Please provide dessert.description'),
  check('dessert.*.requiredType')
    .optional()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage('Please provide a valid dessert.requiredType'),
  check('cancelAt')
    .notEmpty()
    .isISO8601()
    .withMessage('cancelAt must be a valid date'),
  check('notifyAfter')
    .notEmpty()
    .isISO8601()
    .withMessage('notifyAfter must be a valid date'),
];

module.exports = {
  createMenuValidationSchema,
};
