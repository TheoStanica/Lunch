const mongoose = require('mongoose');

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

module.exports = mongoose.model('Menu', menuSchema);
