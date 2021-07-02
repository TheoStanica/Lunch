const Transporter = require('./transporter');

const sendActivationEmail = (user) => {
  Transporter.sentEmail({
    to: user.email,
    subject: 'Account Activation',
    html: `<h2>Hello ${user.fullname}</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://${process.env.HOST_URL}/api/user/activate/${user.activationToken}>Click here</a>
      </div>`,
  });
};

module.exports = { sendActivationEmail };
