const express = require("express");
const router = express.Router();

const userController = require("../../app/controller/UserController");

router.post("/", userController.create);

module.exports = router;
