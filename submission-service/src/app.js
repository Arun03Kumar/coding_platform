const fastifyPlugin = require("fastify-plugin");
const servicePlugin = require("./services/servicePlugin");
const repositoryPlugin = require("./repositories/repositoryPlugin");

async function app(fastify, options) {
  fastify.register(repositoryPlugin);
  fastify.register(fastifyPlugin(servicePlugin));
  fastify.register(require("./routes/api/apiRoutes"), { prefix: "/api" });
}

module.exports = fastifyPlugin(app);
