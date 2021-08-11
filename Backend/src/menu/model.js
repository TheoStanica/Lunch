const mongoose = require('mongoose');
const BadRequestError = require('../errors/badRequestError');
const { courseRequiredType } = require('../utils/enums');

const courseSchema = new mongoose.Schema({
  courseCategory: {
    type: String,
  },
  courses: {
    type: [
      {
        description: {
          type: String,
        },
        requiredType: {
          type: String,
          enum: [courseRequiredType],
        },
      },
    ],
  },
});

const oneMenuSchema = new mongoose.Schema({
  menu: {
    type: [courseSchema],
  },
});

const menuSchema = new mongoose.Schema(
  {
    menu: {
      type: { oneMenuSchema },
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    usersGoing: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

menuSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.deleted;
    return ret;
  },
};

menuSchema.pre('save', function (next) {
  const menu = this.menu;

  if (
    menu
      .map((item) => item.courseCategory)
      .filter((value, index, self) => self.indexOf(value) === index).length !==
    menu.length
  )
    next(new BadRequestError('A menu should have unique course titles.'));

  menu.forEach((course) => {
    if (
      course.courses
        .map((item) => item.description)
        .filter((value, index, self) => self.indexOf(value) === index)
        .length !== course.courses.length
    )
      next(new BadRequestError('Each course should have unique dishes.'));
  });

  next();
});

module.exports = mongoose.model('Menu', menuSchema);
