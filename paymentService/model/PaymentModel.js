const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the course schema
const courseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
});

// Define the user schema
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// Define the payment schema
const paymentSchema = new Schema({
  amount: { type: Number, required: true },
  course: {
    type: courseSchema,
  },
  user: {
    type: userSchema,
  },
  created_at: { type: Date, default: Date.now },
});

const PaymentModel = mongoose.model("Payment", paymentSchema);
module.exports = PaymentModel;
