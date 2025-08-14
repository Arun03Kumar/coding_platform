const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

const app = require("./app");
const connect_db = require("./config/dbConfig");
const { PORT } = require("./config/serverConfig");
const evaluationWorker = require("./workers/evaluationWorker");

async function start() {
    try {
        await fastify.register(cors, { origin: "*" });
        fastify.register(app);

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