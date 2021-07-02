const AccountNotActivatedError = require('../errors/accountNotActivatedError');
const BadRequestError = require('../errors/badRequestError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./model');
const { sendActivationEmail } = require('../utils/emailTemplates');
const { accountStatus } = require('../utils/enums');

const register = async (req, res, next) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return next(new BadRequestError('Email in use'));
    }

    const activationToken = jwt.sign({}, process.env.ACTIVATION_TOKEN_SECRET);
    req.body.password = bcrypt.hashSync(req.body.password);

    let user = new User(req.body);
    user.activationToken = activationToken;
    use = await user.save();

    sendActivationEmail(user);

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new BadRequestError('Invalid credentials'));
    }
    if (user.status === 'pending') {
      sendActivationEmail(user);
      return next(new AccountNotActivatedError());
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const accesToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      }
    );

    res.send({ accesToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    let user = await User.findOne({
      activationToken: req.params._activationToken,
    });

    if (!user) {
      return next(new BadRequestError('Invalid activation token'));
    }

    user.status = accountStatus.active;
    user = await user.save();

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body,
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!payload) {
      return next(new BadRequestError('Invalid refresh token'));
    }

    const accesToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );

    res.send({ accesToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, register, activateAccount, refreshTokens };
