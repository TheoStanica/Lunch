const AccountNotActivatedError = require('../errors/accountNotActivatedError');
const BadRequestError = require('../errors/badRequestError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('./model');
const {
  sendActivationEmail,
  sendForgotPasswordEmail,
} = require('../utils/emailTemplates');
const { accountStatus } = require('../utils/enums');
const NotFoundError = require('../errors/notFoundError');

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

    res.status(201).send();
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

    const accessToken = jwt.sign(
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

    res.send({ accessToken, refreshToken });
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
    let { refreshToken } = req.body,
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
    refreshToken = jwt.sign(
      { id: payload.id },
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

const forgotPassword = async (req, res, next) => {
  const forgotPasswordToken = req.params._token;
  const { email, password } = req.body;

  try {
    if (!forgotPasswordToken) {
      let user = await User.findOne({ email });

      if (!user) {
        return next(new BadRequestError('Invalid email'));
      }

      user.forgotPasswordToken = crypto.randomBytes(20).toString('hex');
      user.forgotPasswordTokenExp = new Date(new Date() + 10 * 60 * 1000);
      user = await user.save();

      sendForgotPasswordEmail(user);

      res.status(204).send();
    } else {
      let user = await User.findOne({ forgotPasswordToken });

      if (!user) {
        return next(new BadRequestError('Invalid forgot password token'));
      }
      if (user.forgotPasswordTokenExp > new Date()) {
        return next(new BadRequestError('Expired forgot password token'));
      }

      user.password = bcrypt.hashSync(password);
      user = await user.save();

      res.status(204).send();
    }
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.send({ user });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  register,
  activateAccount,
  refreshTokens,
  forgotPassword,
  getUser,
  updateUser,
};
