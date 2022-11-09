const { UserModel } = require("../../model/UserModel");
const ResponseJson = require("../../model/ResponseJson");

class UserManagerController {
  // [GET] /admin/list-users
  async getListUsers(req, res) {
    try {
      const listUsers = await UserModel.aggregate([
        { $match: {} },
        {
          $project: {
            _id: 1,
            "local.email": 1,
            role: 1,
            activity: 1,
          },
        },
      ]);
      if (!listUsers) {
        return res
          .status(400)
          .json(new ResponseJson(false, "Error list user", null));
      }

      return res
        .status(200)
        .json(
          new ResponseJson(true, "Get lists users successfully", listUsers)
        );
    } catch (error) {
      console.log("Error :", error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error get list users", null));
    }
  }

  // [PUT] /admin/:idUser/update-active
  async updateByIdAndActive(req, res) {
    try {
      const idUser = req.params.idUser;
      const statusActive = req.query.statusActive;

      let check = true;
      if (statusActive.toLowerCase() === "false") {
        check = false;
      }

      const userUpdate = await UserModel.updateOne(
        { _id: idUser },
        {
          activity: check,
        }
      );

      if (!userUpdate) {
        return res
          .status(400)
          .json(new ResponseJson(false, "Error update acitve user", null));
      }

      if (check) {
        return res
          .status(200)
          .json(new ResponseJson(true, "Account active", null));
      } else {
        return res
          .status(200)
          .json(new ResponseJson(true, "Account inactive", null));
      }
    } catch (error) {
      console.log("Error :", error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error update active user", null));
    }
  }

  // [PUT] /admin/:idUser/update
  async updateById(req, res) {
    try {
      const idUser = req.params.idUser;
      const formData = req.body;

      const userUpdate = await UserModel.updateOne({ _id: idUser }, req.body);

      if (!userUpdate) {
        return res
          .status(400)
          .json(new ResponseJson(false, "Error updating user", null));
      }

      return res
        .status(200)
        .json(new ResponseJson(true, "User updated successfully", null));
    } catch (error) {
      console.log("Error :", error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error update user", null));
    }
  }

  // [DELETE] /admin/:idUser/delete
  async deleteById(req, res) {
    try {
      const idUser = req.params.idUser;
      const deleteUser = await UserModel.deleteOne({ _id: idUser });

      if (!deleteUser) {
        return res
          .status(400)
          .json(new ResponseJson(false, "Delete user failed", null));
      }

      return res
        .status(200)
        .json(new ResponseJson(true, "Delete user successfully", null));
    } catch (error) {
      console.log("Error :", error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error delete users", null));
    }
  }
}

module.exports = new UserManagerController();
