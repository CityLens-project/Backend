import { Router } from "express";
import * as authController from "./controller/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.patch("/reset-password", authController.resetPassword);
