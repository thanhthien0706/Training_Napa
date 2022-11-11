const express = require("express");

const loader = require("./loader");

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  await loader(app, express);

  app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("listening on port " + port);
  });
}

startServer();
