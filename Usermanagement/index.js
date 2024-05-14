const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserManagementRouter = require("./routes/UserManagement.route");
const { RPCObserver } = require("./utils/message passing/rabbit_mq.js");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(8008, () => {
  console.log("usermanagement service is running on port 8008");
});

RPCObserver(process.env.USER_QUEUE_NAME);

app.use(express.json());
app.use(cors({ origin: "http://localhost:8081", credentials: true }));

app.use("/user", UserManagementRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
