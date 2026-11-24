import { Resend } from "resend";

export class ResendProvider {
  client;

  constructor(config) {
    this.client = new Resend(config.apiKey);
  }

  async sendEmail(to, subject, html) {
    try {
      const { data, error } = await this.client.emails.send({
        from: "CityLens <onboarding@resend.dev>",
        to,
        subject,
        html,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
