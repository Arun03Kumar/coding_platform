const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axiosInstance = require("../config/axiosInstance");

function evaluationWorker(queue) {
  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        const payload = job.data;
        console.log("Processing evaluation job with payload:", payload);

        try {
          const response = await axiosInstance.post(
            "http://localhost:3005/sendPayload",
            {
              userId: job.data.userId || "asd",
              payload: job.data,
            }
          );
        } catch (error) {
          console.error("Error processing evaluation job:", error);
        }

        const result = {
          status: "SUCCESS",
          output: "Sample output from evaluation",
        };

        console.log("Evaluation result:", response);
        return result;
      }
    },
    {
      connection: redisConnection,
    }
  );
}

module.exports = evaluationWorker;
