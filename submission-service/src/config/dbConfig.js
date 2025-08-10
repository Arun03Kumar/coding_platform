const mongoose = require("mongoose");
const { DB_CONNECTION_STRING, NODE_ENV } = require("./serverConfig");

async function connect_db() {
  try {
    console.log("string", DB_CONNECTION_STRING, NODE_ENV);
    if (NODE_ENV === "development") {
      console.log("string", DB_CONNECTION_STRING);
      await mongoose.connect(DB_CONNECTION_STRING);
    }
  } catch (err) {
    console.log("Unable to connect to the DB server");
    console.log(err);
  }
}

module.exports = connect_db;
