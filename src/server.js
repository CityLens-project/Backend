import http from "http";
import mongoose from "mongoose";
import { createApp } from "./app.js";
import { connectDB } from "./lib/db/mongoose.js";
import { logger } from "./pkg/logger/logger.js";
import { env } from "./lib/config/env.js";

const app = createApp();
const server = http.createServer(app);
const PORT = env.server.port || 3000;

server.listen(PORT, () => logger.info(`server is running on port ${PORT}`));

connectDB().catch((error) => {
  logger.error("MongoDB connection failed; server remains available", {
    error: error.message,
  });
});

async function shutdown() {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
