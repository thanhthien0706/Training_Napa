const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://mongo-napa:27017/db-docker-node-mongo", {
      useNewUrlParser: true,
    });
    console.log("Connect mongo successfully ");
  } catch (e) {
    console.log("Connect mongo failed: " + e.message);
  }
}

module.exports = connectDatabase;
