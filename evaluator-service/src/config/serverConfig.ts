import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379") || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

export { PORT, REDIS_PORT, REDIS_HOST };
