const nodemailer = require("nodemailer");
require("dotenv").config();

// Extracting email credentials from environment variables
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Function to send an email
const sendEmail = async (receiverEmail, subject, text) => {
  console.log("inside sendEmail function");
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"educator" <${EMAIL_ADDRESS}>`, // sender address
      to: receiverEmail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    const success = true;
    const error = null;
    return { success, error };
  } catch (error) {
    console.error("Error sending email:", error);
    success = true;
    console.log("success", success);
    return success, error;
  }
};

module.exports = sendEmail;
