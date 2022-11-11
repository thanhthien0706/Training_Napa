const { celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();

const UserManagerController = require("../controller/admin/UserManagerController");

const { userIdParamDto, userUpdateDto } = require("../dto/AdminDTO");

router.get("/list-users", UserManagerController.getListUsers);
router.put(
  "/:idUser/update",
  celebrate(userIdParamDto),
  celebrate(userUpdateDto),
  UserManagerController.updateById
);
router.put(
  "/:idUser/update-active",
  celebrate(userIdParamDto),
  UserManagerController.updateByIdAndActive
);

router.delete("/:idUser/delete", UserManagerController.deleteById);

module.exports = router;
