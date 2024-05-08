import express from "express";
import {
  getDashboardData,
  studentCourseProgress,
} from "../controllers/analyse.controller.js";

const router = express.Router();

router.get("/dashboard/:iid", getDashboardData);
router.get("/:uid/:cid", studentCourseProgress);

export default router;
