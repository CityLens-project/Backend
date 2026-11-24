import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./app/auth/auth.route.js";
import cors from "cors";
import { env } from "./lib/config/env.js";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import cookieParser from "cookie-parser";
import { correlationId } from "./lib/correlation/correlationId.js";

export function createApp() {
  const app = express();

  app.get("/health", (req, res) => {
    return res.status(200).json({
      status: "OK",
      message: "Server is responding",
    });
  });

  app.get("/ready", (req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1;

    return res.status(isDatabaseConnected ? 200 : 503).json({
      status: isDatabaseConnected ? "READY" : "NOT_READY",
      database: isDatabaseConnected ? "connected" : "disconnected",
    });
  });

  app.use(
    cors({
      origin: env.cors.origin,
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use(express.json());
  app.use(correlationId);

  app.use("/api/auth", authRouter);

  // global error handler
  app.use(globalErrorHandler);

  return app;
}
