const router = require("express").Router();

const { authValidation } = require("../middleware/authValidation");
const {
  isUserValid,
  validationResults,
} = require("../middleware/bodyValidation");

const userController = require("./controller");

router.post("/login", userController.login);
router.post(
  "/register",
  isUserValid,
  validationResults,
  userController.register
);

module.exports = router;
