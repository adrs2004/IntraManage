import express from "express";
import {
    createTask,
    getTasks,
    updateTaskStatus,
    createSubTask,
    getMyTasks,
} from "../controllers/taskController.js";
import { validateTask } from "../validators/taskValidator.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-tasks", protect, authorizeRoles("intern"), getMyTasks);
router.post("/", protect, validateTask, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:id", protect, updateTaskStatus);

// Subtask Route
router.post("/subtasks", protect, createSubTask);

export default router;