import { NodeMailerProvider } from "../../pkg/email/nodemailer.js";
import { config } from "dotenv";

config();

export const sendMailProvider = new NodeMailerProvider({
  email: process.env.NODEMAILER_MAIL,
  password: process.env.NODEMAILER_PASSWORD,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
});
