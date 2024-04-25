const paymentService = require("../services/paymentService");

exports.test = (req, res) => {
  res.send("Payment controller is working!");
};

exports.newPayment = async (req, res) => {
  const { amount, course, user } = req.body;
  const newPaymentData = {
    amount,
    course,
    user,
  };

  try {
    const newPayment = await paymentService.createPayment(newPaymentData);
    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      newPayment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.allPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const payments = await paymentService.getPaymentsByUser(userId);
    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPaymentsByCourseID = async (req, res) => {
  const { courseId } = req.params;
  try {
    const payments = await paymentService.getPaymentsByCourseID(courseId);
    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
