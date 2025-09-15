import { Request, Response } from "express";
import CommunityStory from "../models/Story";
import mongoose from "mongoose";

// POST /submit - User submits a story
export const submitStory = async (req: Request, res: Response) => {
  try {
    const { name, role, institution, story, image } = req.body;

    if (!name || !role || !story) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStory = new CommunityStory({
      name,
      role,
      institution,
      story,
      image,
    });

    await newStory.save();
    res.status(201).json({ message: "Story submitted successfully", story: newStory });
  } catch (error) {
    console.error("Error submitting story:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET / - Get only approved stories (for frontend)
export const getApprovedStories = async (_req: Request, res: Response) => {
  try {
    const stories = await CommunityStory.find({ approved: true }).sort({ submissionDate: -1 });
    res.json(stories);
  } catch (error) {
    console.error("Error getting approved stories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /all - Get all stories (for admin)
export const getAllStories = async (_req: Request, res: Response) => {
  try {
    const stories = await CommunityStory.find().sort({ submissionDate: -1 });
    res.json(stories);
  } catch (error) {
    console.error("Error getting stories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /:id/approve - Approve/reject a story
export const updateApproval = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updated = await CommunityStory.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating approval:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /:id - Delete a story
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await CommunityStory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ message: "Server error" });
  }
};
