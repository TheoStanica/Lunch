const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending',
    },
    activationToken: {
      type: String,
      uniqe: true,
    },
    forgotPasswordToken: {
      type: String,
      uniqe: true,
    },
    forgotPasswordTokenExp: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

userSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    return ret;
  },
};

module.exports = mongoose.model('User', userSchema);
