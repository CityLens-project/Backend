import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import { config } from "dotenv";

config();

export const cacheProvider = new RedisCacheProvider({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD || "",
});
