import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { idempotency } from "../../lib/idempotency/idempotency.js";
import { authGuard } from "../../lib/auth/guard.js";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authGuard, authController.logout);
authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.patch(
  "/reset-password",
  idempotency(),
  authController.resetPassword,
);
