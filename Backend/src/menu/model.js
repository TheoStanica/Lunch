const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    appetizer: {},
    mainCourse: {},
    dessert: {},
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurat',
      required: true,
    },
    cancelAt: {
      type: Date,
    },
    notifyAfter: {
      type: Date,
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
