const { ResponseBasicDTO } = require("../../dto/ResponseDTO");
const AdminError = require("../../ErrorMessage/AdminError");

const AdminService = require("../../services/web/AdminService");

class UserManagerController {
  // [GET] /admin/list-users
  async getListUsers(req, res, next) {
    try {
      const listUsers = await AdminService.getListUsers();

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Get List Users", listUsers));
    } catch (error) {
      next({
        status: AdminError[error.message].status,
        message: AdminError[error.message].message,
      });
    }
  }

  // [PUT] /admin/:idUser/update
  async updateById(req, res, next) {
    try {
      const idUser = req.params.idUser;

      const dataUser = await AdminService.updateUser(idUser, req.body);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Update User Successfully", null));
    } catch (error) {
      console.log(error);
      next({
        status: AdminError[error.message].status,
        message: AdminError[error.message].message,
      });
    }
  }

  // [PUT] /admin/:idUser/update-active?statusActive=?
  async updateByIdAndActive(req, res, next) {
    try {
      const idUser = req.params.idUser;
      const statusActive = req.query.statusActive;

      let check = true;
      if (statusActive.toLowerCase() === "false") {
        check = false;
      }

      const dataUser = await AdminService.updateUser(idUser, {
        activity: check,
      });

      let message;

      if (check) {
        message = "Account active";
      } else {
        message = "Account inactive";
      }

      return res.status(200).json(new ResponseBasicDTO(true, message, null));
    } catch (error) {
      console.log(error);
      next({
        status: AdminError[error.message].status,
        message: AdminError[error.message].message,
      });
    }
  }

  // [DELETE] /admin/:idUser/delete
  async deleteById(req, res, next) {
    try {
      const idUser = req.params.idUser;

      const result = await AdminService.deleteUserById(idUser);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Delete User Successfully", null));
    } catch (error) {
      console.log(error);
      next({
        status: AdminError[error.message].status,
        message: AdminError[error.message].message,
      });
    }
  }
}

module.exports = new UserManagerController();
