import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/SampleJob.js";
import redis from "../config/redisConfig.js";

export default function sampleWorker(queueName: string) {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SampleJob") {
        const sampleJobInstance = new SampleJob(job.data);
        sampleJobInstance.handle(job);
        return true;
      }
    },
    { connection: redis }
  );
}
