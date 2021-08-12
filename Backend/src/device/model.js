const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fcmToken: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

deviceSchema.options.toJSON = {
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

module.exports = mongoose.model('Device', deviceSchema);
