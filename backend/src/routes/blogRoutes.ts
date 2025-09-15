import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { authenticate } from "../middleware/auth";
import { uploadBlog } from "../middleware/upload";

const router = express.Router();

// ✅ Get all blogs (public)
router.get("/", getAllBlogs);

// ✅ Get single blog by slug (public)
router.get("/:slug", getBlogBySlug);

// ✅ Create blog with image (admin only)
router.post("/", authenticate, uploadBlog.single("image"), createBlog);

// ✅ Update blog with image (admin only)
router.put("/:id", authenticate, uploadBlog.single("image"), updateBlog);

// ✅ Delete blog (admin only)
router.delete("/:id", authenticate, deleteBlog);

export default router;
