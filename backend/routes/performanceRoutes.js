import express from "express";
import { ratePerformance, getMyPerformance } from "../controllers/performanceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/rate", protect, authorizeRoles("manager"), ratePerformance);
router.get("/my-performance", protect, authorizeRoles("intern"), getMyPerformance);

export default router;