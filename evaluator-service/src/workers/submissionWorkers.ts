import { Job, Worker } from "bullmq";
import redis from "../config/redisConfig.js";
import SubmissionJob from "../jobs/SubmissiobJob.js";

export default function submissionWorker(queueName: string) {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      console.log(job.name);
      if (job.name === "SubmissionJob") {
        const submissionJobInstance = new SubmissionJob(job.data);
        submissionJobInstance.handle(job);
        return true;
      }
    },
    { connection: redis }
  );
  //   console.log(worker);
}
