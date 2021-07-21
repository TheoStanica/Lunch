const mongoose = require('mongoose');
const { restaurantStatus } = require('../utils/enums');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      dropdups: true,
    },
    cost: {
      type: Number,
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
    status: {
      type: String,
      enum: [restaurantStatus],
      default: restaurantStatus.active,
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

restaurantSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.deleted;
    return ret;
  },
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
