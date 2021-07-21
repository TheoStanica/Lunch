const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    menu: {
      type: {},
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
