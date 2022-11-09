const express = require("express");
const router = express.Router();

const UserManagerController = require("../controller/admin/UserManagerController");

router.get("/list-users", UserManagerController.getListUsers);
router.put("/:idUser/update", UserManagerController.updateById);
router.put("/:idUser/update-active", UserManagerController.updateByIdAndActive);
router.delete("/:idUser/delete", UserManagerController.deleteById);

module.exports = router;
