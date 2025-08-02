import express from "express";
import bodyparser from "body-parser";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import redis from "./config/redisConfig.js";

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded);
app.use(bodyparser.text());

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log("server is running on port:", PORT);
});
