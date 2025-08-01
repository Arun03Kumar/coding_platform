const mongoose = require("mongoose");
const { DB_CONNECTION_STRING, NODE_ENV } = require("./server.config");

async function connect_db() {
  try {
    if (NODE_ENV === "development") {
      await mongoose.connect(DB_CONNECTION_STRING);
    }
  } catch (err) {
    console.log("Unable to connect to the DB server");
    console.log(err);
  }
}

module.exports = connect_db;
