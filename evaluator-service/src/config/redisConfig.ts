import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "./serverConfig.js";

const redisConfig = {
  port: REDIS_PORT,
  host: REDIS_HOST,
};

const redis = new Redis(redisConfig);

export default redis;
