const mongoose = require('mongoose');
const { accountRole, accountStatus } = require('../utils/enums');

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
      enum: [accountRole],
      default: accountRole.user,
    },
    status: {
      type: String,
      enum: [accountStatus],
      default: accountStatus.pending,
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
    devices: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Device',
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

userSchema.options.toJSON = {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.activationToken;
    delete ret.forgotPasswordToken;
    delete ret.forgotPasswordTokenExp;
    delete ret.devices;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.deleted;
    delete ret.__v;
    return ret;
  },
};

module.exports = mongoose.model('User', userSchema);
