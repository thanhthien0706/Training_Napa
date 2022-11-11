const CheckAccount = require("../middlewares/CheckAccount");

const AuthRouter = require("./AuthRouter");
const AdminRouter = require("./AdminRouter");
const ErrorHandler = require("../middlewares/ErrorHandler");
const RoleRouter = require("./RoleRouter");

const routes = (app) => {
  app.use("/auth", AuthRouter);
  app.use("/admin", CheckAccount.checkRole("ROLE_ADMIN"), AdminRouter);
  app.use("/role", RoleRouter);
  app.use("/test", (req, res) => {
    res.json({ mess: "hello" });
  });
  app.use(ErrorHandler);
};

module.exports = routes;
