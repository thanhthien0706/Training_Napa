const CheckAccount = require("../middleware/CheckAccount");

const AuthenRouter = require("./AuthenRouter");
const AdminRouter = require("./AdminRouter");

const routes = (app) => {
  app.use("/auth", AuthenRouter);
  app.use("/admin", CheckAccount.checkRole("ROLE_ADMIN"), AdminRouter);
  app.use("/test", CheckAccount.checkRole("ROLE_USER"), (req, res) => {
    res.json({ mess: "hello" });
  });
};

module.exports = routes;
