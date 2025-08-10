const fastify = require("fastify")({ logger: true });

const app = require("./app");
const connect_db = require("./config/dbConfig");
const { PORT } = require("./config/serverConfig");

fastify.register(app);

fastify.listen({ port: PORT }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is running at:", PORT);
  await connect_db();
  console.log("db connected");
});
