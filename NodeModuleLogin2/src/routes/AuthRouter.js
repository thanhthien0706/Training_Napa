const { celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();

const AuthController = require("../controller/AuthController");

const {
  createUserDto,
  signInUserDto,
  forgotPasswordDto,
  resetPasswordDto,
  changePasswordDto,
} = require("../dto/UserDTO");

router.post("/signup", celebrate(createUserDto), AuthController.signup);
router.post("/signin", celebrate(signInUserDto), AuthController.signin);
router.post(
  "/forgot-password",
  celebrate(forgotPasswordDto),
  AuthController.forgotPassword
);
router.get(
  "/reset-password",
  celebrate(resetPasswordDto),
  AuthController.resetPassword
);
router.post(
  "/change-password",
  celebrate(changePasswordDto),
  AuthController.changePassword
);

router.get("/github", AuthController.signInGithub);
router.get("/github/callback", AuthController.signInGithubCallback);

module.exports = router;
