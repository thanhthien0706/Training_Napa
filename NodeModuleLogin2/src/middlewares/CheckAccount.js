const { getToken, verifyToken } = require("../services/plugins/JwtService");
const AuthError = require("../ErrorMessage/AuthError");

const UserService = require("../services/web/UserService");
const RoleService = require("../services/web/RoleService");
const { default: mongoose } = require("mongoose");

class CheckAccount {
  async checkLogin(req, res, next) {
    const token = getToken(req.headers);

    if (token === null) {
      throw new Error("expiredTokens");
    }

    let dataToken = await verifyToken(token);

    if (dataToken.id === null) {
      throw new Error("notVerifyToken");
    } else {
      req.userId = dataToken.id;
      next();
    }
  }

  checkRole(roleName) {
    return async (req, res, next) => {
      try {
        const token = getToken(req.headers);
        if (token == null) {
          throw new Error("expiredTokens");
        }
        let dataToken = await verifyToken(token);
        if (dataToken === null) {
          throw new Error("notVerifyToken");
        } else {
          const idUser = dataToken.id;
          const user = await UserService.findOneById(idUser);
          if (!user) {
            throw new Error("isExist");
          }
          const role = await RoleService.findOneByField({
            _id: mongoose.Types.ObjectId(user.role),
          });
          if (role.name.toLowerCase() == roleName.toLowerCase()) {
            return next();
          }
          throw new Error("notPermission");
        }
      } catch (error) {
        console.log(error);
        next({
          status: AuthError[error.message].status,
          message: AuthError[error.message].message,
        });
      }
    };
  }
}

module.exports = new CheckAccount();
