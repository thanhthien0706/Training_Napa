const express = require("express");
const router = express.Router();

const AuthenController = require("../controller/AuthenController");

router.post("/signup", AuthenController.signup);
router.post("/signin", AuthenController.signin);
router.post("/forgotPassword", AuthenController.forgotPassword);
router.post("/changePassword", AuthenController.changePassword);
router.get("/reset-password", AuthenController.resetPassword);
router.get("/github", AuthenController.signInGithub);
router.get("/github/callback", AuthenController.signInGithubCallback);

module.exports = router;
