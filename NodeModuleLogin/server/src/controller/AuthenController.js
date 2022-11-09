const passport = require("passport");
const mongoose = require("mongoose");
const ejs = require("ejs");

const { getToken, generateToken, verifyToken } = require("../jwt/handleToken");

const { UserModel, StatusActive } = require("../model/UserModel");
const ResponseJson = require("../model/ResponseJson");
const { sendMail } = require("../service/EmailService");

class AuthenController {
  // [POST] /auth/signup
  signup(req, res, next) {
    passport.authenticate("local-signup", (err, user) => {
      if (err) {
        return res.json(new ResponseJson(false, "Error signin", null));
      }

      if (!user) {
        return res.json(new ResponseJson(false, "User exists", null));
      }

      return res.json(new ResponseJson(true, "Create user successfully", user));
    })(req, res, next);
  }

  // [POST] /auth/signin
  signin(req, res, next) {
    passport.authenticate("local-signin", async (err, user) => {
      if (err) {
        return res
          .status(500)
          .json(new ResponseJson(false, "Error signin", null));
      }

      if (!user) {
        return res
          .status(404)
          .json(new ResponseJson(false, "User not found", null));
      }

      let status, statusCheck, message;
      const token = await generateToken(
        {
          id: user._id,
        },
        {
          expiresIn: "30 days",
        }
      );

      if (token) {
        status = 200;
        statusCheck = true;
        message = "Signin and Token generated successfully";
      } else {
        status = 500;
        statusCheck = false;
        message = "Signin successfully and Token generated failed";
      }

      return res.status(status).json(
        new ResponseJson(statusCheck, message, {
          token,
        })
      );
    })(req, res, next);
  }

  // [GET] /auth/github
  signInGithub(req, res, next) {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  }

  // [GET] /auth/github/callback
  async signInGithubCallback(req, res, next) {
    passport.authenticate("github", async (err, user) => {
      try {
        if (err) {
          return res
            .status(500)
            .json(new ResponseJson(false, "Error signin", null));
        }

        if (!user) {
          return res
            .status(404)
            .json(new ResponseJson(false, "User not found", null));
        }

        let status, statusCheck, message;
        const token = await generateToken(
          {
            id: user._id,
          },
          {
            expiresIn: "30 days",
          }
        );

        if (token) {
          status = 200;
          statusCheck = true;
          message = "Signin and Token generated successfully";
        } else {
          status = 500;
          statusCheck = false;
          message = "Signin successfully and Token generated failed";
        }

        return res.status(status).json(
          new ResponseJson(statusCheck, message, {
            token,
          })
        );
      } catch (error) {}
    })(req, res, next);
  }

  // [PUT] /auth/changePassword
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, tokenReset } = req.body;
      let id, user;

      if (oldPassword) {
        const token = getToken(req.headers);
        const dataToken = await verifyToken(token);

        id = dataToken.id;

        user = await UserModel.findById(id);

        if (!user) {
          return res
            .status(404)
            .json(new ResponseJson(false, "User not found", null));
        }

        if (!user.validPassword(oldPassword)) {
          return res
            .status(406)
            .json(new ResponseJson(false, "Wrong passwrod", null));
        }
      } else {
        const dataToken = await verifyToken(tokenReset);
        id = dataToken.id;
        user = await UserModel.findById(id);
      }

      const updateUser = await UserModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          "local.password": user.generateHash(newPassword),
        }
      );

      let status, checkStatus, message;
      if (updateUser) {
        status = 200;
        checkStatus = true;
        message = "Find user and Password changed successfully";
      } else {
        status = 500;
        checkStatus = false;
        message = "Find user successfully and Password changed failed";
      }

      if (oldPassword) {
        return res
          .status(status)
          .json(new ResponseJson(checkStatus, message, updateUser));
      } else {
        let messPass = "";
        if (checkStatus) {
          messPass = "Password changed successfully";
        } else {
          messPass = "Password changed failed";
        }

        return res.render("page/Resetpassword", {
          isShow: true,
          token: tokenReset,
          messPass,
        });
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error change password", null));
    }
  }

  // [POST] /auth/forgotPassword
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ "local.email": email });

      if (!user) {
        return res
          .status(404)
          .json(new ResponseJson(false, "User not found", null));
      }

      const token = await generateToken(
        {
          id: user._id,
        },
        {
          expiresIn: "2h",
        }
      );

      const url = `${req.protocol}://${req.get(
        "host"
      )}/auth/reset-password?token=${token}`;
      const subject = `Reset Password for ${user._id}`;
      const toEmail = user.local.email;

      ejs.renderFile(
        "./src/views/mail/MailResetPassword.ejs",
        {
          link: url,
          hours: 2,
        },
        async (err, content) => {
          if (err) {
            return res
              .status(500)
              .json(
                new ResponseJson(
                  false,
                  "Error reading file template",
                  err.message
                )
              );
          }

          const resultSendMail = await sendMail(content, subject, toEmail);

          if (!resultSendMail) {
            return res
              .status(500)
              .json(new ResponseJson(false, "Error send mail", err.message));
          }

          return res
            .status(200)
            .json(
              new ResponseJson(
                true,
                "Send mail forgot password successfully",
                null
              )
            );
        }
      );
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error forgot password", null));
    }
  }

  // [GET] /auth/reset-password
  async resetPassword(req, res) {
    try {
      const token = req.query.token;

      const dataToken = await verifyToken(token);

      if (dataToken.exp < new Date().getTime() / 1000) {
        return res.render("page/Resetpassword", {
          isShow: false,
          messPass: "",
        });
      }
      return res.render("page/Resetpassword", {
        isShow: true,
        token,
        messPass: "",
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json(new ResponseJson(false, "Error change password", null));
    }
  }
}

module.exports = new AuthenController();
