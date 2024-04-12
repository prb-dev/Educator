import express from "express";
import {
  addDay,
  addSchedule,
  addSession,
  deleteDay,
  deleteSchedule,
  deleteSession,
} from "../controllers/schedule.controller.js";

const router = express.Router();

router.post("/", addSchedule);
router.delete("/:scid", deleteSchedule);
router.post("/day/:scid", addDay);
router.delete("/day/:scid/:did", deleteDay);
router.post("/session/:scid/:did", addSession);
router.delete("/session/:scid/:did/:sid", deleteSession);


export default router;
