import express from "express";
import {
  enroll,
  enrollmentConflictCheck,
  unenroll,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/validate/:uid/:cid", enrollmentConflictCheck);
router.post("/:uid/:cid", enroll);
router.post("/unenroll/:uid/:cid", unenroll);

export default router;
