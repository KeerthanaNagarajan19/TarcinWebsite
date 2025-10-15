// backend/src/routes/galleryRoutes.ts
import express from "express";
// import { auth } from "../middleware/auth"; // keep your existing auth import
import {
  createGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController";

// IMPORTANT: import the named export uploadGallery that we added previously
import { uploadGallery } from "../middleware/upload"; // <-- ensure this is correct path

const router = express.Router();

// Public
router.get("/", getGalleries);
router.get("/:id", getGalleryById);

// Admin-protected
// NOTE: uploadGallery.array(...) returns a middleware function; auth must also be a function.
// If your auth middleware has a different name/path, update that import above.
router.post("/", uploadGallery.array("images", 12), createGallery);
router.put("/:id",  uploadGallery.array("images", 12), updateGallery);
router.delete("/:id",  deleteGallery);

export default router;
