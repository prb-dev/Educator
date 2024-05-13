import express from "express";
import {
  addDay,
  addSchedule,
  addSession,
  deleteDay,
  deleteSchedule,
  deleteSession,
  getSchedule,
  updateSchedule,
} from "../controllers/schedule.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:cid", verifyToken, getSchedule);
router.post("/", verifyToken, addSchedule);
router.delete("/:scid/:cid", verifyToken, deleteSchedule);
router.put("/:scid", verifyToken, updateSchedule);
router.post("/day/:scid", verifyToken, addDay);
router.delete("/day/:scid/:did", verifyToken, deleteDay);
router.post("/session/:scid/:did", verifyToken, addSession);
router.delete("/session/:scid/:did/:sid", verifyToken, deleteSession);

export default router;
