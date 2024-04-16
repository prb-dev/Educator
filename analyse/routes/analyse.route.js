import express from "express";
import {
  getTotalStudents,
  studentCourseProgress,
} from "../controllers/analyse.controller.js";

const router = express.Router();

router.get("/count/:cid", getTotalStudents);
router.get("/:uid/:cid", studentCourseProgress);

export default router;
