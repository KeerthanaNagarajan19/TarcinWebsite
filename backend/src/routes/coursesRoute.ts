import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { uploadCourse } from "../middleware/upload";

const router = express.Router();

const cpUpload = uploadCourse.fields([
  { name: "image", maxCount: 1 },
  { name: "syllabus", maxCount: 1 },
]);

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", cpUpload, createCourse);
router.put("/:id", cpUpload, updateCourse);
router.delete("/:id", deleteCourse);

export default router;
