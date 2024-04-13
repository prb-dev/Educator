import express from "express";
import { studentCourseProgress } from "../controllers/analyse.controller.js";

const router = express.Router();

router.get("/:uid/:cid", studentCourseProgress);

export default router;
