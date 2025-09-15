import { Request, Response } from "express";
import Event from "../models/Event";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { recordAnnouncement } from "../utils/newsletter";

// GET all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET event by ID
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, endDate, location, registrationLink, isUpcoming } = req.body;

    const image = req.file ? `/uploads/events/${req.file.filename}` : undefined;

    const newEvent = new Event({
      title,
      description,
      date,
      endDate,
      location,
      registrationLink,
      image,
      isUpcoming,
    });

    const savedEvent = await newEvent.save();
    console.log("POST /api/cms/events hit");
    const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
await recordAnnouncement({
  type: "event",
  refId: String(savedEvent._id),
  title: savedEvent.title,
  summary: savedEvent.description?.slice(0, 180),
  url: `${base}/events`, // or per-event page if you have one
  image: savedEvent.image ? `${base}${savedEvent.image}` : undefined,
});
res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE event by ID
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const updateData: any = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/events/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log(`✅ PUT /api/cms/events/${id} hit`);
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE event by ID

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    // First, find the event so we can access its image path
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔥 Delete image file from filesystem if it exists
    if (event.image) {
      const imagePath = path.join(__dirname, "..", "..", event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image file deleted:", imagePath);
      }
    }

    // Now delete the event from DB
    await Event.findByIdAndDelete(id);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

