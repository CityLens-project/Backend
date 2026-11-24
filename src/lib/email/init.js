// import { NodeMailerProvider } from "../../pkg/email/nodemailer.js";
import { ResendProvider } from "../../pkg/email/resend.js";
import { env } from "../config/env.js";

// export const sendMailProvider = new NodeMailerProvider({
//   email: env.nodemailer.email,
//   password: env.nodemailer.password,
//   host: env.nodemailer.host,
//   port: env.nodemailer.port,
// });

export const sendMailProvider = new ResendProvider({
  // email: env.nodemailer.email,
  // password: env.nodemailer.password,
  // host: env.nodemailer.host,
  // port: env.nodemailer.port,
  apiKey: env.resend.apiKey,
});
