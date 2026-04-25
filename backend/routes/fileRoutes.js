import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadFile, getFiles } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/:projectId", protect, getFiles);

export default router;