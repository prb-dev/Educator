import express from "express"
import { addSchedule } from "../controllers/schedule.controller.js"

const router = express.Router()

router.post('/', addSchedule)

export default router