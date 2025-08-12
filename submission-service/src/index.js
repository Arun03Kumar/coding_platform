const fastify = require("fastify")({ logger: true });

const app = require("./app");
const connect_db = require("./config/dbConfig");
const { PORT } = require("./config/serverConfig");
const evaluationWorker = require("./workers/evaluationWorker");

fastify.register(app);

// fastify.listen({ port: PORT }, async (err) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   console.log("Server is running at:", PORT);
//   await connect_db();
//   console.log("db connected");
// });

async function start() {
  try {
    await connect_db();
    console.log("db connected");

    await fastify.listen({ port: PORT });
    console.log("Server is running at:", PORT);

    await evaluationWorker("EvaluationQueue");

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
