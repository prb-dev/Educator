import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import analyseRouter from "./routes/analyse.route.js";

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

app.listen(8003, () => {
  console.log("analyse service is running on port 8003");
});

app.use(express.json());

app.use("/analyse", analyseRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
