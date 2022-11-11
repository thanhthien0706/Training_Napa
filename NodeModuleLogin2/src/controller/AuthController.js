const { ResponseBasicDTO } = require("../dto/ResponseDTO");
const AuthError = require("../ErrorMessage/AuthError");
const AuthService = require("../services/web/AuthService");

class AuthController {
  // [POST] /auth/signup
  async signup(req, res, next) {
    try {
      const dataUser = await AuthtService.signup(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Create user successfully", dataUser));
    } catch (error) {
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  // [POST] /auth/signin
  async signin(req, res, next) {
    try {
      const token = await AuthService.signin(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Sign in successfully", token));
    } catch (error) {
      console.log(error);
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  // [POST] /auth/forgot-password
  async forgotPassword(req, res, next) {
    try {
      const payload = req.body;
      payload.host = req.get("host");
      payload.protocol = req.protocol;

      const forgotPassword = await AuthtService.forgotPassword(payload);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Send mail forgot password", null));
    } catch (error) {
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  // [GET] /auth/forgot-password?token=...
  async resetPassword(req, res, next) {
    try {
      const token = req.query.token;

      const chekToken = await AuthtService.resetPassword(token);

      if (chekToken) {
        return res.render("page/Resetpassword", {
          isShow: true,
          token,
          messPass: "",
        });
      }
    } catch (error) {
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  // [PUT] /auth/changePassword
  async changePassword(req, res, next) {
    try {
      const { newPassword, tokenReset } = req.body;

      const resultChangePassword = await AuthtService.changePassword(
        newPassword,
        tokenReset
      );

      if (resultChangePassword) {
        return res.status(200).json(
          new ResponseBasicDTO(true, "Change Password Success", {
            newPassword,
          })
        );
      }
    } catch (error) {
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  // [GET] /auth/github
  async signInGithub(req, res, next) {
    try {
      await AuthService.signinGithub(req, res, next);
    } catch (error) {
      console.log(error);
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }

  async signInGithubCallback(req, res, next) {
    try {
      const token = await AuthService.signinGithubCallback(req, res, next);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Sign in successfully", token));
    } catch (error) {
      next({
        status: AuthError[error.message].status,
        message: AuthError[error.message].message,
      });
    }
  }
}

module.exports = new AuthController();
