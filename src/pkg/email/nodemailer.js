import nodemailer from "nodemailer";

export class NodeMailerProvider {
  transporter;
  email;
  constructor(config) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: Number(config.port),
      secure: Number(config.port) === 465,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
      auth: {
        user: config.email,
        pass: config.password,
      },
    });

    this.email = config.email;
  }

  async sendEmail(to, subject, html) {
    try {
      return await this.transporter.sendMail({
        from: `"CityLens" <${this.email}>`,
        to,
        subject,
        html,
      });
    } catch (err) {
      console.error("Error while sending mail:", err);
      throw err;
    }
  }
}
