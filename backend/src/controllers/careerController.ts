import { Request, Response } from "express";
import Career from "../models/Career";
import mongoose from "mongoose";
import { recordAnnouncement } from "../utils/newsletter";

// Get all careers
export const getAllCareers = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find().sort({ postedDate: -1 });
    res.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get career by ID (optional frontend use)
export const getCareerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json(career);
  } catch (error) {
    console.error("Error fetching career:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new career
export const createCareer = async (req: Request, res: Response) => {
  try {
    const {
      title,
      department,
      location,
      description,
      requirements,
      isActive,
      applicationLink,
    } = req.body;

    if (!title || !department || !location || !description || !requirements) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCareer = new Career({
      title,
      department,
      location,
      description,
      requirements,
      isActive,
      applicationLink,
      postedDate: new Date(),
    });

    await newCareer.save();
    console.log("✅ POST /api/cms/careers hit");
   const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
await recordAnnouncement({
  type: "career",
  refId: String(newCareer._id),
  title: newCareer.title,
  summary: newCareer.description?.slice(0, 180),
  url: `${base}/careers`,
});
console.log("✅ POST /api/cms/careers hit");
res.status(201).json(newCareer);
  } catch (error) {
    console.error("Error creating career:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update career by ID
export const updateCareer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCareer = await Career.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCareer) {
      return res.status(404).json({ message: "Career not found" });
    }

    console.log(`✅ PUT /api/cms/careers/${id} hit`);
    res.json(updatedCareer);
  } catch (error) {
    console.error("Error updating career:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete career by ID
export const deleteCareer = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid career ID" });
  }

  try {
    const deleted = await Career.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Career not found" });
    }

    res.json({ message: "Career deleted successfully" });
  } catch (error) {
    console.error("Error deleting career:", error);
    res.status(500).json({ message: "Server error" });
  }
};
