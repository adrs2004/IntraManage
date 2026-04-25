import express from "express";
import { registerUser, loginUser, getMe, inviteManager, heartbeat } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../validators/authValidator.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", protect, getMe);

// Manager Invitation Route (Admin Only)
router.post("/invite-manager", protect, authorizeRoles("admin"), inviteManager);

// Heartbeat
router.post("/heartbeat", protect, heartbeat);

export default router;