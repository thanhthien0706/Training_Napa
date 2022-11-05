const express = require("express");
const router = express.Router();

const UserRoute = require("./api/UserRoute");

router.use("/user", UserRoute);
router.use("/", (req, res) => {
  res.json({
    mess: "Wellcome to api Thanh Thien",
  });
});

function route(app) {
  app.use("/api", router);
}

module.exports = route;
