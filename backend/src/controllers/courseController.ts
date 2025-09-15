import { Request, Response } from "express";
import Course from "../models/Course";
import { recordAnnouncement } from "../utils/newsletter";

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


// Get single course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch {
    res.status(500).json({ message: "Error fetching course" });
  }
};

// Create course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
await recordAnnouncement({
  type: "course",
  refId: String(course._id),
  title: course.title,
  summary: course.description?.slice(0, 180),
  url: `${base}/courses`, // or /course/:id if you expose slugs
  image: course.image ? `${base}${course.image}` : undefined,
});
res.status(201).json(course);
  } catch {
    res.status(500).json({ message: "Error creating course" });
  }
};

// Update course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(course);
  } catch {
    res.status(500).json({ message: "Error updating course" });
  }
};

// Delete course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch {
    res.status(500).json({ message: "Error deleting course" });
  }
};


