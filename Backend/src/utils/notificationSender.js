const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = require('../user/model');
const Device = require('../device/model');

const sendNotification = async ({ notification, users }) => {
  try {
    let fcmTokens = [];
    users.forEach((user) => {
      user.devices.forEach((device) => fcmTokens.push(device.fcmToken));
    });

    const { results } = await admin.messaging().sendToDevice(
      fcmTokens,
      {
        notification,
      },
      {
        contentAvailable: true,
        priority: 'high',
      }
    );
    const fcmTokensToRemove = [];
    results.forEach((result, index) => {
      if (result.error) {
        fcmTokensToRemove.push(fcmTokens[index]);
      }
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Device.deleteMany(
        {
          fcmToken: { $in: fcmTokensToRemove },
        },
        { session: session }
      );

      // remove device ids from Users

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { sendNotification };
