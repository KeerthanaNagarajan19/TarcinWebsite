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
    const data = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.image) {
      data.image = `/uploads/courses/${files.image[0].filename}`;
    }
    if (files?.syllabus) {
      data.syllabus = `/uploads/courses/${files.syllabus[0].filename}`;
    }

    // Parse stringified fields if they come from FormData
    if (typeof data.highlights === "string") data.highlights = JSON.parse(data.highlights);
    if (typeof data.modules === "string") data.modules = JSON.parse(data.modules);
    if (typeof data.faqs === "string") data.faqs = JSON.parse(data.faqs);

    const course = await Course.create(data);
    const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
    await recordAnnouncement({
      type: "course",
      refId: String(course._id),
      title: (course as any).title,
      summary: (course as any).description?.slice(0, 180),
      url: `${base}/courses`,
      image: (course as any).image ? `${base}${(course as any).image}` : undefined,
    });
    res.status(201).json(course);
  } catch (error: any) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// Update course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.image) {
      data.image = `/uploads/courses/${files.image[0].filename}`;
    }
    if (files?.syllabus) {
      data.syllabus = `/uploads/courses/${files.syllabus[0].filename}`;
    }

    // Parse stringified fields if they come from FormData
    if (typeof data.highlights === "string") data.highlights = JSON.parse(data.highlights);
    if (typeof data.modules === "string") data.modules = JSON.parse(data.modules);
    if (typeof data.faqs === "string") data.faqs = JSON.parse(data.faqs);

    const course = await Course.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error: any) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// Delete course (with file cleanup)
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // 🔥 Delete associated files
    const fs = require("fs");
    const path = require("path");
    const fields = ["image", "syllabus"];
    fields.forEach((field) => {
      const filePath = (course as any)[field];
      if (filePath && filePath.startsWith("/uploads/")) {
        const fullPath = path.join(__dirname, "..", "..", filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    });

    await Course.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};


