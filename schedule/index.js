import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scheduleRouter from "./routes/schedule.route.js";
import { createChannel } from "./utils/message passing/rabbit_mq.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

export const channel = await createChannel();

const app = express();

app.listen(3000, () => {
  console.log("schedule service is running on port 3000");
});

app.use(express.json());

app.use("/schedule", scheduleRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
