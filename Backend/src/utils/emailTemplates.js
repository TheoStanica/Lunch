const Transporter = require('./transporter');

const sendActivationEmail = (user) => {
  Transporter.sentEmail({
    to: user.email,
    subject: 'Lunch App Account Activation',
    html: `<h2>Hello ${user.fullname}</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://${process.env.HOST_URL}/api/user/activate/${user.activationToken}>Click here</a>
      `,
  });
};

const sendForgotPasswordEmail = (user) => {
  Transporter.sentEmail({
    to: user.email,
    subject: 'Lunch App Forgot Password',
    html: `<h2>Hello ${user.fullname}</h2>
          <p>Please enter the following ${user.forgotPasswordToken} into the application to reset your password.</p>
          `,
  });
};

module.exports = { sendActivationEmail, sendForgotPasswordEmail };
