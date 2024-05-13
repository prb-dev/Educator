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

//route to get the schedule of a course
router.get("/:cid", verifyToken, getSchedule);

//route to add the schedule to a course
router.post("/", verifyToken, addSchedule);

//route to delete the schedule of a course
router.delete("/:scid/:cid", verifyToken, deleteSchedule);

//route to update the schedule of a course
router.put("/:scid", verifyToken, updateSchedule);

//route to add a day to the schedule of a course
router.post("/day/:scid", verifyToken, addDay);

//route to delete a day to the schedule of a course
router.delete("/day/:scid/:did", verifyToken, deleteDay);

//route to add a session to the schedule of a course
router.post("/session/:scid/:did", verifyToken, addSession);

//route to delete a day to the schedule of a course
router.delete("/session/:scid/:did/:sid", verifyToken, deleteSession);

export default router;
