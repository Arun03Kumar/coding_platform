const fastify = require("fastify")({ logger: true });

const app = require("./app");

fastify.register(app);

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is running at:", 3000);
});
