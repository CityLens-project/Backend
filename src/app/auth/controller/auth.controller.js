import * as authService from "../service/auth.service.js";
import { validateBody } from "../../../lib/validation/validation.js";
import {
  signupDTO,
  verifyAccountDTO,
  loginDTO,
  sendOtpDTO,
  resetPasswordDTO,
  verifyOtpDTO,
} from "../dto/auth.dto.js";

export async function signup(req, res, next) {
  try {
    const data = validateBody(signupDTO, req.body);

    await authService.signup(data);
    return res.json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyAccount(req, res, next) {
  try {
    const data = validateBody(verifyAccountDTO, req.body);
    const { email, code } = data;

    await authService.verifyAccount(email, code);
    return res.json({
      message: "User verified successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const data = validateBody(loginDTO, req.body);
    const { email, password } = data;

    const { user, token } = await authService.login(email, password);
    res.cookie("access_token", token, { maxAge: 3600, httpOnly: true });

    return res.json({
      message: "Logged in successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function sendOTP(req, res, next) {
  try {
    const data = validateBody(sendOtpDTO, req.body);

    await authService.sendOTP(data.email);

    return res.json({
      message: "OTP sent successfully, check your email",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyOTP(req, res, next) {
  try {
    const data = validateBody(verifyOtpDTO, req.body);
    await authService.verifyOTP(data.email, data.code);

    return res.json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const data = validateBody(resetPasswordDTO, req.body);

    const { email, newPassword, code } = data;
    await authService.resetPassword(email, newPassword, code);

    return res.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res, next) {
  res.clearCookie("access_token");
  return res.json({
    message: "Logged out successfully",
    success: true,
  });
}

// export async function loginWithGoogle(req, res, next) {
//   try {
//     // const data = validateBody(loginWithGoogleDTO, req.body);

//     const token = await authService.loginWithGoogle(req.body.credential);
//     res.cookie("access_token", token, { httpOnly: true, maxAge: 3600 });

//     return res.json({
//       message: "User login successfully",
//       success: true,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
