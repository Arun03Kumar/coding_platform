const SubmissionService = require("./submissionService");

async function servicePlugin(fastify, options) {
  fastify.decorate(
    "submissionService",
    new SubmissionService(fastify.submissionRepository)
  );
}

module.exports = servicePlugin;
