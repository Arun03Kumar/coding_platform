import { Queue } from "bullmq";
import redis from "../config/redisConfig.js";

export default new Queue("SubmissionQueue", { connection: redis });
