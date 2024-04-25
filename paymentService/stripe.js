require("dotenv").config();

const paymentService = require("./services/paymentService");

exports.test = (req, res) => {
  res.send("Strip gateway controller is working!");
};

// Import the Payment model
exports.paymentGateway = async (req, res) => {
  const { course, amount, successEndPoint, cancelEndPoint } = req.body;

  try {
    const url = await paymentService.createCheckoutSession(
      course,
      amount,
      successEndPoint,
      cancelEndPoint
    );

    res.json({
      url,
      newPaymentData: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
