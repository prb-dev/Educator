import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scheduleRouter from "./routes/schedule.route.js";

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

app.listen(3000, () => {
  console.log("learner service is running on port 3000");
});

app.use("/schedule", scheduleRouter);

app.use((req, res, error, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
