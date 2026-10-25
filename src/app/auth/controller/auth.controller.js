import * as authService from "../service/auth.service.js";

export async function signup(req, res, next) {
  try {
    await authService.signup(req.body);
    res.json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyAccount(req, res, next) {
  try {
    const { email, code } = req.body;
    await authService.verifyAccount(email, code);
    res.json({
      message: "User verified successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.cookie("access-token", token, { maxAge: 3600 });

    res.json({
      message: "User Logged in successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function sendOTP(req, res, next) {
  try {
    const email = req.body.email;
    await authService.sendOTP(email);

    res.json({
      message: "OTP sent successfully, check your email",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyOTP(req, res, next) {
  try {
    const { email, code } = req.body;
    await authService.verifyOTP(email, code);

    res.json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { email, newPassword } = req.body;
    await authService.resetPassword(email, newPassword);

    res.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
