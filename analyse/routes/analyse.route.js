import express from "express";
import {
  getDashboardData,
  studentCourseProgress,
} from "../controllers/analyse.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//route to get the dashboard data
router.get("/dashboard/:iid", getDashboardData);

//route to get the student progress
router.get("/:uid/:cid", studentCourseProgress);

export default router;
