const expressLoader = require("./loader/express");
const loader = require("./loader");

const port = process.env.PORT || 3000;

async function startServer() {
  await loader();
  const app = expressLoader();
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("listening on port " + port);
  });
}

module.exports = startServer();
