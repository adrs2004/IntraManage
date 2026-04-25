import express from "express";
import { createReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/:projectId", protect, getReports);

export default router;