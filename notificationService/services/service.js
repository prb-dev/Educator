const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    // Extracting email credentials from environment variables
    this.EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
    this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

    // Creating transporter
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: this.EMAIL_ADDRESS,
        pass: this.EMAIL_PASSWORD,
      },
    });
  }

  async successEnrollEmail(receiverEmail, courseName) {
    const subject = "Enrollment Successful";
    const text = `Dear student,
      you have successfully enrolled in the course. We look forward to seeing you in class!
      course name: ${courseName}
      💐💐
      Visit your dashboard to access the course.
    Best Regards,
    The educator team`;

    console.log("successEnrollEmail");
    return await this.sendEmail(receiverEmail, subject, text);
  }

  async failedEmail(receiverEmail, courseName) {
    const subject = "Enrollment Failed";
    const text = `Dear student,
      we regret to inform you that your enrollment in the course was unsuccessful. Please try again or contact support for assistance.
      course name: ${courseName}
      😢😢
    Best Regards,
    The educator team`;

    return await this.sendEmail(receiverEmail, subject, text);
  }

  async sendEmail(receiverEmail, subject, text) {
    console.log("inside sendEmail function");
    try {
      const info = await this.transporter.sendMail({
        from: `"educator" <${this.EMAIL_ADDRESS}>`,
        to: receiverEmail,
        subject: subject,
        text: text,
      });
      console.log("Message sent: %s", info.messageId);
      const success = true;
      const error = null;
      return { success, error };
    } catch (error) {
      console.error("Error sending email:", error);
      const success = false;

      return { success, error };
    }
  }

  async eventHandler(paylaod) {
    const { receiverEmail, courseName, event } = paylaod;
    console.log("payload", paylaod);
    if (event === "ENROLL_SUCCESS") {
      // return await this.successEnrollEmail(receiverEmail, courseName);
      const { success, error } = await this.successEnrollEmail(
        receiverEmail,
        courseName
      );
      return { success, error };
    } else if (event === "ENROLL_FAILED") {
      return await this.failedEmail(receiverEmail, courseName);
    }
  }
}

module.exports = EmailService;
