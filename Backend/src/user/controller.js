const AccountNotActivatedError = require("../errors/accountNotActivatedError");
const BadRequestError = require("../errors/badRequestError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./model");

const register = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password);

    let user = new User(req.body);
    use = await user.save();

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
      return next(new BadRequestError("Invalid credentials"));
    }
    if (user.status === "pending") {
      return next(new AccountNotActivatedError());
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(new BadRequestError("Invalid credentials"));
    }

    const accesToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    res.send({ accesToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, register };
