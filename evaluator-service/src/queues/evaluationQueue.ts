import redis from "../config/redisConfig.js";
import { Queue } from "bullmq";

export default new Queue("EvaluationQueue", { connection: redis });
