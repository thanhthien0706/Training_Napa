const RolerService = require("../services/web/RoleService");
const { ResponseBasicDTO } = require("../dto/ResponseDTO");
const RoleError = require("../ErrorMessage/RoleError");

class RoleController {
  async initData(req, res, next) {
    try {
      const arrayInforRole = [
        {
          name: "ROLE_ADMIN",
          description: "",
        },
        {
          name: "ROLE_USER",
          description: "",
        },
      ];

      const listData = [];
      arrayInforRole.forEach((role, index) => {
        RolerService.createRole(role)
          .then((data) => {
            listData.push(data);
            if (index == arrayInforRole.length - 1) {
              return res
                .status(200)
                .json(
                  new ResponseBasicDTO(
                    200,
                    "Create list role successfully",
                    listData
                  )
                );
            }
          })
          .catch((error) => {
            next({
              status: RoleError[error.message].status,
              message: RoleError[error.message].message,
            });
          });
      });
    } catch (error) {
      next({
        status: RoleError[error.message].status,
        message: RoleError[error.message].message,
      });
    }
  }

  async addRole(req, res, next) {
    try {
      const roleData = await RolerService.createRole(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(200, "Create role successfully", roleData));
    } catch (error) {
      next({
        status: RoleError[error.message].status,
        message: RoleError[error.message].message,
      });
    }
  }
}

module.exports = new RoleController();
