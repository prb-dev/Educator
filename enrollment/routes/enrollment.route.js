import express from "express";
import {
  enroll,
  enrollmentConflictCheck,
  unenroll,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

//route to check the enrollment conflicts
router.post("/validate/:uid/:cid", enrollmentConflictCheck);

//route to enroll a student
router.post("/:uid/:cid", enroll);

//route to unenroll a student
router.post("/unenroll/:uid/:cid", unenroll);

export default router;
