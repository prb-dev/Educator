require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(
  course,
  amount,
  successEndPoint,
  cancelEndPoint
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}${successEndPoint}`,
      cancel_url: `${process.env.CLIENT_URL}${cancelEndPoint}`,
    });

    return session.url;
  } catch (error) {
    throw new Error("Failed to create checkout session: " + error.message);
  }
}

async function createPayment(newPaymentData) {
  const payment = new Payment({
    amount: newPaymentData.amount,
    course: newPaymentData.course,
    user: newPaymentData.user,
  });

  try {
    // Check all fields are present
    if (!payment.amount || !payment.course || !payment.user) {
      throw new Error("All fields are required");
    }

    // Save payment
    const newPayment = await payment.save();
    return newPayment;
  } catch (err) {
    throw new Error("Failed to create payment: " + err.message);
  }
}

async function getAllPayments() {
  try {
    const payments = await Payment.find();
    return payments;
  } catch (err) {
    throw new Error("Error retrieving payments: " + err.message);
  }
}

async function getPaymentsByUser(userId) {
  try {
    const payments = await Payment.find({ "user._id": userId });

    if (payments.length === 0) {
      throw new Error("No payments found for this user");
    }

    return payments;
  } catch (err) {
    throw new Error("Error retrieving payments: " + err.message);
  }
}

async function getPaymentsByCourseID(courseId) {
  try {
    const payments = await Payment.find({ "course._id": courseId });

    if (payments.length === 0) {
      throw new Error("No payments found for this course");
    }

    return payments;
  } catch (err) {
    throw new Error("Error retrieving payments: " + err.message);
  }
}

module.exports = {
  createCheckoutSession,
  createPayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByCourseID,
};
