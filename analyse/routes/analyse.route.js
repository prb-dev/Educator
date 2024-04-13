import express from "express";
import { studentProgress } from "../controllers/analyse.controller.js";

const router = express.Router();

router.post("/", studentProgress);

export default router;
