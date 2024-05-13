import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scheduleRouter from "./routes/schedule.route.js";
import { RPCObserver } from "./utils/message passing/rabbit_mq.js";
import cors from "cors";
import ScheduleService from "./services/schedule.service.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

//create the app
const app = express();

app.listen(8000, () => {
  console.log("schedule service is running on port 8000");
});

//create a service object and observe schedule queue
const service = new ScheduleService();
RPCObserver(process.env.SCHEDULE_QUEUE_NAME, service);

//using important packages
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/schedule", scheduleRouter);

//middleware to handle errors
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
