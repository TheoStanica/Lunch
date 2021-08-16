const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = require('../user/model');
const Device = require('../device/model');

const sendNotification = async ({ notification, users, data }) => {
  try {
    let fcmTokens = [];
    let deviceIds = [];
    users.forEach((user) => {
      user.devices.forEach((device) => {
        fcmTokens.push(device.fcmToken);
        deviceIds.push(device.id);
      });
    });

    if (fcmTokens.length > 0) {
      const { results } = await admin.messaging().sendToDevice(
        fcmTokens,
        {
          notification,
          data,
        },
        {
          contentAvailable: true,
          priority: 'high',
        }
      );

      const devicesToRemove = [];
      results.forEach((result, index) => {
        if (result.error) {
          devicesToRemove.push(deviceIds[index]);
        }
      });

      if (devicesToRemove.length > 0) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
          await Device.deleteMany(
            {
              _id: { $in: devicesToRemove },
            },
            { session: session }
          );

          await User.updateMany(
            { devices: { $not: { $size: 0 } } },
            {
              $pull: { devices: { $in: devicesToRemove } },
            },
            { session: session }
          );

          await session.commitTransaction();
          session.endSession();
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { sendNotification };
