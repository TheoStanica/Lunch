const { courseRequiredType } = require('../utils/enums');
const mongoose = require('mongoose');

const courseType = {
  _id: false,
  description: {
    type: String,
    required: true,
  },
  requiredType: {
    type: String,
    enum: [courseRequiredType],
    default: courseRequiredType.both,
  },
};

const menuSchema = new mongoose.Schema(
  {
    appetizer: {
      type: [courseType],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    mainCourse: {
      type: [courseType],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    dessert: {
      type: [courseType],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    cancelAt: {
      type: Date,
      required: true,
    },
    notifyAfter: {
      type: Date,
      required: true,
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
    return ret;
  },
};

module.exports = mongoose.model('Menu', menuSchema);
