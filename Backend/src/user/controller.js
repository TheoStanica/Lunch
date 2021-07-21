const AccountNotActivatedError = require('../errors/accountNotActivatedError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('./model');
const {
  sendActivationEmail,
  sendForgotPasswordEmail,
} = require('../utils/emailTemplates');
const { accountStatus, accountRole } = require('../utils/enums');

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
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new BadRequestError('Invalid credentials'));
    }
    if (user.status === accountStatus.pending) {
      sendActivationEmail(user);
      return next(new AccountNotActivatedError());
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
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

    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );
    refreshToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      }
    );

    res.send({ accessToken, refreshToken });
  } catch (error) {
    return next(new BadRequestError('Invalid refresh token'));
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
    const user = await User.findOne({ _id: req.params._userId || req.user.id });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    if (req.user.role === accountRole.user && user.id !== req.user.id) {
      return next(new ForbiddenError());
    }

    res.send({ user });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send({ users });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params._userId || req.user.id });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    if (req.user.role === accountRole.user && user.id !== req.user.id) {
      return next(new ForbiddenError());
    }

    if (req.body.email && (await User.findOne({ email: req.body.email }))) {
      return next(new BadRequestError('Email in use'));
    }

    user.email = req.body.email || user.email;
    user.fullname = req.body.fullname || user.fullname;

    if (req.body.password)
      user.password = bcrypt.hashSync(req.body.password) || user.password;

    if (req.user.role === accountRole.admin) {
      user.role = req.body.role || user.role;
      user.status = req.body.status || user.status;
    }

    user = await user.save();

    res.send({ user });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params._userId });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    user.deleted = true;
    await user.save();

    res.status(204).send();
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
  getAllUsers,
  updateUser,
  deleteUser,
};
