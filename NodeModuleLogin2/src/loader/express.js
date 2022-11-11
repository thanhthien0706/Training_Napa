const path = require("path");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();

const routes = require("../routes");

const express = async (app, expressApp) => {
  app.use(cors());

  // view engine setup
  app.set("views", "./src/views");
  app.set("view engine", "ejs");

  app.use(expressApp.json());
  app.use(expressApp.urlencoded({ extended: false }));
  app.use(expressApp.static("./public"));
  app.use(
    session({
      secret: "thanhthien bla bla",
      resave: false,
      saveUninitialized: true,
    })
  );

  routes(app);

  return app;
};

module.exports = express;
