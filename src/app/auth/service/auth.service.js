import * as authRepository from "../repository/auth.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { cacheProvider } from "../../../lib/cache/init.js";
import { sendMailProvider } from "../../../lib/email/init.js";
import jwt from "jsonwebtoken";

// Create sign up service
export async function signup(userData) {
  const userExist = await authRepository.checkUserExistByEmail(userData.email);
  if (userExist) throw new Error("User Already Exists.");

  userData.password = await bcrypt.hash(userData.password, 10);

  const createdUser = await authRepository.createUser(userData);

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  const key = `otp:${userData.email}`;
  await cacheProvider.set(key, hashedOtp, 900);

  // send email
  await sendMailProvider.sendEmail(
    userData.email,
    "Verification Code",
    `<p>Your verification code is <b>${otp}</b></p>`,
  );

  return createdUser;
}

// Create verify account service
export async function verifyAccount(email, code) {
  const userExist = await authRepository.checkUserExistByEmail(email);
  if (!userExist) throw new Error("User Not Exist.");

  if (userExist.isVerified) throw new Error("User Already Verified.");

  const hashedOtp = await cacheProvider.get(`otp:${email}`);
  if (!hashedOtp) throw new Error("OTP is expired.");

  const match = await bcrypt.compare(code, hashedOtp);
  if (!match) throw new Error("Invalid OTP.");

  await cacheProvider.del(`otp:${email}`);
  return await userRepository.updateUserByEmail(email, { isVerified: true });
}

// Create login service
export async function login(email, password) {
  const userExist = await authRepository.checkUserExistByEmail(email);
  if (!userExist) throw new Error("User Not Exist.");

  if (!userExist.isVerified) throw new Error("User Not Verified.");

  const match = await bcrypt.compare(password, userExist.password);

  if (!match) throw new Error("Invalid email or password.");

  const token = jwt.sign(
    { id: userExist._id, email: userExist.email, name: userExist.name },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
  );
  return token;
}

// Create send otp function (for FORGET PASSWORD SERVICE)
export async function sendOTP(email) {
  const userExist = await authRepository.checkUserExistByEmail(email);
  if (!userExist) throw new Error("User Not Exist.");

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  await cacheProvider.set(`otp:${email}`, hashedOtp, 900);

  // send email
  await sendMailProvider.sendEmail(
    email,
    "Verification Code",
    `<p>Your verification code is <b>${otp}</b></p>`,
  );
}

// Verify otp code function (for FORGET PASSWORD SERVICE)
export async function verifyOTP(email, code) {
  const hashedOtp = await cacheProvider.get(`otp:${email}`);
  if (!hashedOtp) throw new Error("OTP is expired.");

  const match = await bcrypt.compare(code, hashedOtp);
  if (!match) throw new Error("Invalid OTP.");

  await cacheProvider.del(`otp:${email}`);

  return match;
}

// Create reset password function (for FORGET PASSWORD SERVICE)
export async function resetPassword(email, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepository.updateUserByEmail(email, { password: hashedPassword });
}
