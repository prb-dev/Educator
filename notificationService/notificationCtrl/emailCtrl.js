const emailService = require("../services/service");

exports.successEnrollEmail = async (req, res) => {
  const { receiverEmail, courseName } = req.body;
  console.log("receiverEmail", receiverEmail);
  console.log("courseName", courseName);

  try {
    const { success, error } = await emailService.successEnrollEmail(
      receiverEmail,
      courseName
    );

    if (success) {
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(500).json({ error: error || "Error sending email" });
    }
  } catch (error) {
    console.error("Error sending email:");
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

exports.failedEmail = async (req, res) => {
  const { receiverEmail, courseName } = req.body;
  console.log("receiverEmail", receiverEmail);
  console.log("courseName", courseName);

  try {
    const { success, error } = await emailService.failedEmail(
      receiverEmail,
      courseName
    );

    if (success) {
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(500).json({ error: error || "Error sending email" });
    }
  } catch (error) {
    console.error("Error sending email:");
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};
