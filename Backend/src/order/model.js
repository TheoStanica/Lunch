const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {},
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
    return ret;
  },
};

module.exports = mongoose.model('Order', orderSchema);
