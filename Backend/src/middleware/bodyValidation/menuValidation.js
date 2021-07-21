const { check } = require('express-validator');
const { courseRequiredType, courseTypes } = require('../../utils/enums');

const createMenuValidationSchema = [
  check('restaurantId')
    .notEmpty()
    .withMessage('restaurantId is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurantId'),

  check(`menu`).notEmpty().withMessage(`Menu is required`),
  check('menu.*.*')
    .custom((obj) => {
      const keys = Object.keys(obj);
      if (keys.length > 2) return false;
      if (keys.some((key) => !Object.keys(courseTypes).includes(key)))
        return false;
      return true;
    })
    .withMessage(
      'Course must have only description and requiredType(optional) fields'
    ),
  check(`menu.*.*.description`)
    .notEmpty()
    .withMessage(`Please provide a description for the course`),
  check(`menu.*.*.requiredType`)
    .notEmpty()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage(`Please provide a valid requiredType for the course`)
    .optional(),

  check('cancelAt')
    .notEmpty()
    .isISO8601()
    .withMessage('cancelAt must be a valid date'),
  check('notifyAfter')
    .notEmpty()
    .isISO8601()
    .withMessage('notifyAfter must be a valid date'),
];

const updateMenuValidationSchema = [
  check('restaurantId')
    .notEmpty()
    .withMessage('restaurantId is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurantId')
    .optional(),
  check(`menu`).optional(),
  check('menu.*.*')
    .custom((obj) => {
      const keys = Object.keys(obj);
      if (keys.length > 2) return false;
      if (keys.some((key) => !Object.keys(courseTypes).includes(key)))
        return false;
      return true;
    })
    .optional()
    .withMessage(
      'Course must only have only description and requiredType(optional) field'
    ),
  check(`menu.*.*.description`)
    .notEmpty()
    .withMessage(`Please provide a description for the course`)
    .optional(),
  check(`menu.*.*.requiredType`)
    .optional()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage(`Please provide a valid requiredType for the course`),
  check('cancelAt')
    .notEmpty()
    .isISO8601()
    .withMessage('cancelAt must be a valid date')
    .optional(),
  check('notifyAfter')
    .notEmpty()
    .isISO8601()
    .withMessage('notifyAfter must be a valid date')
    .optional(),
];

module.exports = {
  createMenuValidationSchema,
  updateMenuValidationSchema,
};
