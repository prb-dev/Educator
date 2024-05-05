import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import enrollmentRouter from "./routes/UserManagement.route.js";
import cors from "cors";

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

app.listen(8009, () => {
  console.log("enrollment service is running on port 8002");
});

app.use(express.json());
app.use(cors());

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
