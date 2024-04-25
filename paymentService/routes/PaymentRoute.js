const express = require("express");
const PaymentCtrl = require("../controller/PaymentCtrl");
const Stripe = require("../stripe");
const router = express.Router();

// Test the payment controller
router.get("/test", PaymentCtrl.test);

// Define routes for storing and retrieving payments
router.post("/new", PaymentCtrl.newPayment);
router.get("/all", PaymentCtrl.allPayments);
router.get("/paymentsByUser/:userId", PaymentCtrl.getPaymentsByUser);
router.get("/paymentsByCourse/:courseId", PaymentCtrl.getPaymentsByCourseID);

router.post("/stripe", Stripe.paymentGateway);
router.get("/stripe/test", Stripe.test);

module.exports = router;
