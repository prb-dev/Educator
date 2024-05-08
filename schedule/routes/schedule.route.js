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

const router = express.Router();

router.get("/:cid", getSchedule);
router.post("/", addSchedule);
router.delete("/:scid/:cid", deleteSchedule);
router.put("/:scid", updateSchedule);
router.post("/day/:scid", addDay);
router.delete("/day/:scid/:did", deleteDay);
router.post("/session/:scid/:did", addSession);
router.delete("/session/:scid/:did/:sid", deleteSession);

export default router;
