const Transporter = require('./transporter');

const sendActivationEmail = (user) => {
  Transporter.sentEmail({
    //to: user.email,
    to: 'ovidiuoviovi174@gmail.com',
    subject: 'Account Activation',
    html: `<h2>Hello ${user.fullname}</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://192.168.100.2:3000/api/user/confirm/${user.activationToken}>Click here</a>
      </div>`,
  });
};

module.exports = { sendActivationEmail };
