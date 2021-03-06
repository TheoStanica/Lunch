const Transporter = require('./transporter');

const sendActivationEmail = (user) => {
  Transporter.sentEmail({
    to: user.email,
    subject: 'Lunch App Account Activation',
    html: `<h2>Hello ${user.fullname}</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://${process.env.HOST_URL}/api/deeplink/activate/${user.activationToken}>Click here </a>
      `,
  });
};

const sendForgotPasswordEmail = (user) => {
  Transporter.sentEmail({
    to: user.email,
    subject: 'Lunch App Forgot Password',
    html: `<h2>Hello ${user.fullname}</h2>
          <p>Please reset your password by clicking on the following link</p>
          <a href=http://${process.env.HOST_URL}/api/deeplink/forgotpassword/${user.forgotPasswordToken}>Click here </a>
          `,
  });
};

module.exports = { sendActivationEmail, sendForgotPasswordEmail };
