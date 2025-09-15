import express from "express";
import {
  submitStory,
  getApprovedStories,
  getAllStories,
  updateApproval,
  deleteStory,
} from "../controllers/storyController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// Frontend routes
router.get("/", getApprovedStories);
router.post("/submit", submitStory);

// Admin routes
router.get("/all", authenticate, getAllStories);
router.put("/:id/approve", authenticate, updateApproval);
router.delete("/:id", authenticate, deleteStory);

export default router;
