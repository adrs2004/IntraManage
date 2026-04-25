import express from "express";
import { getSystemStats, getManagers, getInterns, deleteUser } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getSystemStats);
router.get("/managers", protect, authorizeRoles("admin"), getManagers);
router.get("/interns", protect, authorizeRoles("admin"), getInterns);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
