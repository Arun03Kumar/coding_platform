const submissionQueue = require("../queues/submissionQueue");

module.exports = async function (payload) {
    console.log("submissionQueue Payload:", payload);
  await submissionQueue.add("SubmissionJob", payload);
  console.log("submission job added");
};
