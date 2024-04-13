import express from "express";
import { enroll, unenroll } from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/:uid/:cid", enroll);
router.post("/unenroll/:uid/:cid", unenroll);

export default router;
