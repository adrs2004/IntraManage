import express from "express";
import { logActivity, getActivities, getTeamActivityAndStatus } from "../controllers/activityController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, logActivity);
router.get("/", protect, getActivities);
router.get("/team", protect, authorizeRoles("manager"), getTeamActivityAndStatus);

export default router;