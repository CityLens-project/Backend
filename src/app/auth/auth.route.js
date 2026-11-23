import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { idempotency } from "../../lib/idempotency/idempotency.js";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.patch(
  "/reset-password",
  idempotency(),
  authController.resetPassword,
);
