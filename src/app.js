import express from "express";
import "./lib/db/mongoose.js";
import { authRouter } from "./app/auth/auth.route.js";
import cors from "cors";
import { env } from "./lib/config/env.js";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import cookieParser from "cookie-parser";
import { correlationId } from "./lib/correlation/correlationId.js";

export function createApp() {
  const app = express();

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
