const { check, param } = require('express-validator');
const { courseRequiredType, courseTypes } = require('../../utils/enums');

const createMenuValidationSchema = [
  check('restaurantId')
    .notEmpty()
    .withMessage('restaurantId is required.')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurantId'),
  check(`menu`).notEmpty().withMessage(`Menu is required.`),
  check('menu.*.courseCategory')
    .notEmpty()
    .withMessage('courseCategory is required.'),
  check('menu.*.courses').notEmpty().withMessage('courses is required.'),
  check('menu.*.courses.*')
    .custom((obj) => {
      const keys = Object.keys(obj);
      if (keys.length > 2) return false;
      if (keys.some((key) => !Object.keys(courseTypes).includes(key)))
        return false;
      return true;
    })
    .withMessage(
      'Course must have only description and requiredType (optional) fields.'
    ),
  check(`menu.*.courses.*.description`)
    .notEmpty()
    .withMessage(`Please provide a description for the course.`),
  check(`menu.*.courses.*.requiredType`)
    .notEmpty()
    .isIn([
      courseRequiredType.restaurant,
      courseRequiredType.takeaway,
      courseRequiredType.both,
    ])
    .withMessage(
      `Please provide a valid requiredType for the course (restaurant, takeaway, both)`
    )
    .optional(),
];

const menuIdValidationSchema = [
  param('_id')
    .notEmpty()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid menu ID'),
];

const getMenuValidationSchema = [];

module.exports = {
  createMenuValidationSchema,
  menuIdValidationSchema,
  getMenuValidationSchema,
};
