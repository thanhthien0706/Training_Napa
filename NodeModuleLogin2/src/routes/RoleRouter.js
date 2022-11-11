const { celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();

const { createRoleDto } = require("../dto/RoleDTO");

const RoleController = require("../controller/RoleController");

router.get("/init-role", RoleController.initData);
router.post("/add-role", celebrate(createRoleDto), RoleController.addRole);

module.exports = router;
