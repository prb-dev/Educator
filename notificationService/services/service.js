const sendEmail = require("../email");

const successEnrollEmail = async (receiverEmail, courseName) => {
  const subject = "Enrollment Successful";
  const text = `Dear student,
    you have successfully enrolled in the ${courseName} course. We look forward to seeing you in class!
    💐💐
    Visit your dashboard to access the course.
Best Regards,
The educator team`;

  return await sendEmail(receiverEmail, subject, text);
};

const failedEmail = async (receiverEmail, courseName) => {
  const subject = "Enrollment Failed";
  const text = `Dear student,
    we regret to inform you that your enrollment in the ${courseName} course was unsuccessful. Please try again or contact support for assistance.
    😢😢
Best Regards,
The educator team`;

  return await sendEmail(receiverEmail, subject, text);
};

module.exports = { successEnrollEmail, failedEmail };
