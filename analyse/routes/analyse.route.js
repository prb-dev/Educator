import express from "express";
import {
  getDashboardData,
  studentCourseProgress,
} from "../controllers/analyse.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/dashboard/:iid", verifyToken, getDashboardData);
router.get("/:uid/:cid", verifyToken, studentCourseProgress);

export default router;
