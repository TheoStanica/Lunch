const mongoose = require('mongoose');
const { courseRequiredType, orderStatus } = require('../utils/enums');

const orderSchema = new mongoose.Schema(
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Menu',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: [courseRequiredType],
      required: true,
    },
    status: {
      type: String,
      enum: [orderStatus],
      default: orderStatus.active,
      required: true,
    },
    menuOptions: {
      type: {},
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

orderSchema.options.toJSON = {
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

module.exports = mongoose.model('Order', orderSchema);
