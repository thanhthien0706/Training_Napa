const UserService = require("./UserService");
const RoleService = require("./RoleService");
const JwtService = require("../plugins/JwtService");
const FileService = require("../web/FileService");
const MailService = require("../plugins/MailService");

const passport = require("passport");

class AuthService {
  async signup(userModel) {
    const dataRoleUser = await RoleService.findOneByName("ROLE_USER");
    if (dataRoleUser) {
      userModel.role = dataRoleUser._id;
      userModel.activity = true;
      const user = await UserService.save(userModel);
      return user;
    }
  }

  async signin(userModel) {
    const dataUser = await UserService.findOneUserByEmail(userModel.email);

    if (!dataUser.validPassword(userModel.password)) {
      throw new Error("wrongPassword");
    }

    const token = await JwtService.generateToken({ id: dataUser._id });

    return token;
  }

  async forgotPassword(payload) {
    const user = await UserService.findOneUserByEmail(payload.email);

    if (user) {
      const token = await JwtService.generateToken(
        { id: user._id },
        {
          expiresIn: "2h",
        }
      );

      const url = `${payload.protocol}://${payload.host}/auth/reset-password?token=${token}`;

      const contentMail = await FileService.readViewEjs(
        "mail/MailResetPassword.ejs",
        {
          link: url,
          hours: 2,
        }
      );

      const subject = `Reset Password for ${user._id}`;
      const toEmail = user.local.email;

      const resultSendMail = await MailService.sendMail(
        contentMail,
        subject,
        toEmail
      );

      if (resultSendMail) {
        return true;
      }
    }
  }

  async resetPassword(token) {
    const dataToken = await JwtService.verifyToken(token);

    if (dataToken.exp < new Date().getTime() / 1000) {
      throw new Error("expiredTokens");
    }

    return true;
  }

  async changePassword(newPassword, token) {
    const dataToken = await JwtService.verifyToken(token);

    if (dataToken) {
      const oldUser = await UserService.findOneById(dataToken.id);
      const user = await UserService.findOneAndUpdateByCondition(
        {
          _id: dataToken.id,
        },
        {
          "local.password": oldUser.generateHash(newPassword),
        }
      );

      return true;
    }
  }

  signinGithub(req, res, next) {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  }

  signinGithubCallback(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate("github", async (err, user) => {
        if (err) {
          throw new Error("notFound");
        }

        if (!user) {
          throw new Error("notCreateUser");
        }

        const token = await JwtService.generateToken({ id: user._id });

        resolve(token);
      })(req, res, next);
    });
  }
}

module.exports = new AuthService();
