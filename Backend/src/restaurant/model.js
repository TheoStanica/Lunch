const mongoose = require('mongoose');

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
    return ret;
  },
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
