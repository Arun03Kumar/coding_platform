async function v1Routes(fastify, options) {
  // fastify.register(require("./test/testRoutes"), { prefix: "/test" });
  fastify.register(require("./submissionRoutes"), {
    prefix: "/submission",
  });
}

module.exports = v1Routes;
