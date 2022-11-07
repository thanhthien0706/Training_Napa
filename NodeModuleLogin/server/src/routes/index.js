const AuthenRouter = require("./AuthenRouter");

const routes = (app) => {
  app.use("/auth", AuthenRouter);
  // app.use("/", (req, res) => {
  //   res.json({
  //     mess: "Chao ban",
  //   });
  // });

  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  });
};

module.exports = routes;
