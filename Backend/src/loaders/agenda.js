const Agenda = require('agenda');
const User = require('../user/model');
const { sendNotification } = require('../utils/notificationSender');
const moment = require('moment');

const agenda = new Agenda({
  db: { address: process.env.MONGO_CONNECT, collection: 'Jobs' },
});
agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda connection error!'));

const clear = async () => {
  console.log('disconnecting agenda from mongo');
  await agenda.stop();
  process.exit(0);
};

process.on('SIGTERM', clear);
process.on('SIGINT', clear);

(async function () {
  await agenda.start();
  const users = await User.find({ devices: { $not: { $size: 0 } } }).populate(
    'devices'
  );

  users.forEach(async (user) => {
    await agenda.define(`initializeReminder-${user.id}`, async (job) => {
      console.log('sending notification to user', user.id);
      const _time = moment(user.remindAt, 'h:mm a').format();
      console.log('notification for');
      console.log(moment(_time).hour());
      console.log(moment(_time).minute());
      sendNotification({
        users: [user],
        notification: {
          title: 'Luch App',
          color: '#FBBC00',
          body: 'Please make an order for today',
        },
        data: {},
      });
    });
    agenda.every('35 17 * * 1-5', `initializeReminder-${user.id}`, {
      userId: user.id,
    });
  });
})();
