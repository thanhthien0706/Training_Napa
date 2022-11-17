const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();

const routes = require("../routes");

const app = express();

const expressLoader = () => {
  app.use(cors());

  // view engine setup
  app.set("views", "./src/views");
  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("./public"));
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

module.exports = expressLoader;
