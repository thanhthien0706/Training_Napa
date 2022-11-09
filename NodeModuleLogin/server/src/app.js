const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const ServerGlobal = require("./controller/ServerGlobal");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "thanhthien bla bla",
    resave: false,
    saveUninitialized: true,
  })
);

require("./middleware/Passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

routes(app);
// app.post("/auth/signup", (req, res, next) => {
//   passport.authenticate("local-signup", {
//     successRedirect: "/test-1", // redirect to the secure profile section
//     failureRedirect: "/test-2", // redirect back to the signup page if there is an error
//   })(req, res, next);
// });

const instance = ServerGlobal.getInstance();
module.exports = app;
