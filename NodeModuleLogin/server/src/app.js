const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const bodyParser = require("body-parser");
const cors = require("cors");
// const connectDatabase = require("./config/database");
require("dotenv").config();
const ServerGlobal = require("./controller/ServerGlobal");

const routes = require("./routes");

const app = express();

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routes(app);

const instance = ServerGlobal.getInstance();
module.exports = app;
