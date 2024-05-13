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
router.get("/:iid/:cid", getSchedule);

//route to add the schedule to a course
router.post("/:iid", addSchedule);

//route to delete the schedule of a course
router.delete("/:iid/:scid/:cid", deleteSchedule);

//route to update the schedule of a course
router.put("/:iid/:scid", updateSchedule);

//route to add a day to the schedule of a course
router.post("/day/:scid", addDay);

//route to delete a day to the schedule of a course
router.delete("/day/:scid/:did", deleteDay);

//route to add a session to the schedule of a course
router.post("/session/:scid/:did", addSession);

//route to delete a day to the schedule of a course
router.delete("/session/:scid/:did/:sid", deleteSession);

export default router;
