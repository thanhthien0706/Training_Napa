const { getToken, verifyToken } = require("../jwt/handleToken");
const ResponseJson = require("../model/ResponseJson");
const { UserModel } = require("../model/UserModel");
const RoleModel = require("../model/RoleModel");

class CheckAccount {
  async checkLogin(req, res, next) {
    const token = getToken(req.headers);

    if (token === null) {
      return res
        .status(403)
        .json(new ResponseJson(false, "User not logged in", null));
    }

    let dataToken = await verifyToken(token);

    if (dataToken.id === null) {
      return res
        .status(403)
        .json(new ResponseJson(false, "No verify token provided!", null));
    } else {
      req.userId = dataToken.id;
      next();
    }
  }

  checkRole(roleName) {
    return async (req, res, next) => {
      try {
        const token = getToken(req.headers);
        if (token === null) {
          return res
            .status(403)
            .json(new ResponseJson(false, "User not logged in", null));
        }
        let dataToken = await verifyToken(token);
        if (dataToken === null) {
          return res
            .status(403)
            .json(new ResponseJson(false, "No verify token provided!", null));
        } else {
          const idUser = dataToken.id;
          const user = await UserModel.findOne({ _id: idUser });
          if (!user) {
            return res
              .status(406)
              .json(new ResponseJson(false, "User not found!", null));
          }
          const role = await RoleModel.findById(user.role);
          if (role.name.toLowerCase() == roleName.toLowerCase()) {
            return next();
          }

          return res
            .status(400)
            .json(new ResponseJson(false, "User not have permission", null));
        }
      } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json(new ResponseJson(false, "Error check admin", null));
      }
    };
  }
}

module.exports = new CheckAccount();
