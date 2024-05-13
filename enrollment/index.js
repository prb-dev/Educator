import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import enrollmentRouter from "./routes/enrollment.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.listen(8002, () => {
  console.log("enrollment service is running on port 8002");
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/enrollment", enrollmentRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
