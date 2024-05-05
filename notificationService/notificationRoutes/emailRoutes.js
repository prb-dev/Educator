const express = require("express");
const router = express.Router();

const emailCtrl = require("../notificationCtrl/emailCtrl");

router.post("/success_enroll_email", emailCtrl.successEnrollEmail);
router.post("/failed_enroll_email", emailCtrl.failedEmail);
router.post("/event_handler", emailCtrl.eventHandler);

module.exports = router;
