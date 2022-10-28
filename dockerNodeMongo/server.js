const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./router");
const connectDatabase = require("./config/database");

const port = process.env.PORT || 8181;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

route(app);

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log("listening on port " + port);
  });
});
