const fastifyPlugin = require("fastify-plugin");
const servicePlugin = require("./services/servicePlugin");

async function app(fastify, options) {
  fastify.register(fastifyPlugin(servicePlugin));
  fastify.register(require("./routes/api/apiRoutes"), { prefix: "/api" });
}

module.exports = fastifyPlugin(app);
