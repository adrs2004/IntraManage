import express from "express";
import {
    createProject,
    joinProject,
    assignRole,
    getProject,
    getMyProject,
    getManagerDashboard,
    getManagerProjectsDetailed
} from "../controllers/projectController.js";
import { validateProject } from "../validators/projectValidator.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Manager
router.get("/manager-dashboard", protect, authorizeRoles("manager"), getManagerDashboard);
router.get("/manager-projects-detailed", protect, authorizeRoles("manager"), getManagerProjectsDetailed);
router.post("/assign-role", protect, authorizeRoles("manager"), assignRole);
router.post(
    "/create",
    protect,
    authorizeRoles("manager"),
    validateProject,
    createProject
);

// Intern
router.get("/my-project", protect, authorizeRoles("intern"), getMyProject);
router.post("/join", protect, authorizeRoles("intern"), joinProject);

// Common
router.get("/:id", protect, getProject);

export default router;