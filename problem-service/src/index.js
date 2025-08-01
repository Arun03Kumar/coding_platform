const express = require("express");
const bodyparser = require("body-parser");
const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");
const errorHandler = require("./utils/errorHandler");
const connect_db = require("./config/db.config");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({
    message: "problem service is alive",
  });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("server started at port:", PORT);
  await connect_db();
  console.log("successfully connected to DB");
});
