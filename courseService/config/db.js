const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection URL
const DB_URL = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
