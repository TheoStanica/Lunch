const nodemailer = require("nodemailer");

class Transporter {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  sentEmail = async ({ to, subject, html }) => {
    await this.transporter.sendMail({
      from: `"Lunch App" ${process.env.GMAIL_USER}`,
      to,
      subject,
      html,
    });
  };
}

module.exports = new Transporter();
