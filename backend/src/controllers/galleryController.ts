import { Request, Response } from "express";
import Gallery from "../models/Gallery";

// Create gallery post (admin)
export const createGallery = async (req: Request, res: Response) => {
  try {
    const { title, description, category, date } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];
    const imagePaths = files.map((f) => `/uploads/gallery/${f.filename}`);

    if (!title || !date) {
      return res.status(400).json({ success: false, message: "Title and date are required" });
    }

    const newGallery = new Gallery({
      title,
      description,
      category,
      images: imagePaths,
      date: new Date(date),
      postedBy: (req as any).user?.id,
    });

    await newGallery.save();
    res.status(201).json({ success: true, data: newGallery });
  } catch (err: any) {
    console.error("Create Gallery Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Get all galleries
export const getGalleries = async (req: Request, res: Response) => {
  try {
    const { category, limit = 100, page = 1 } = req.query as any;
    const query: any = {};
    if (category) query.category = category;

    const perPage = Math.min(parseInt(limit), 200) || 50;
    const skip = (Math.max(parseInt(page) || 1, 1) - 1) * perPage;

    const [items, total] = await Promise.all([
      Gallery.find(query).sort({ date: -1 }).skip(skip).limit(perPage).lean(),
      Gallery.countDocuments(query),
    ]);

    res.json({ success: true, data: items, total });
  } catch (err: any) {
    console.error("Get Galleries Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Get gallery by ID
export const getGalleryById = async (req: Request, res: Response) => {
  try {
    const g = await Gallery.findById(req.params.id);
    if (!g) return res.status(404).json({ success: false, message: "Gallery post not found" });
    res.json({ success: true, data: g });
  } catch (err: any) {
    console.error("Get Gallery By ID Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Update gallery post
export const updateGallery = async (req: Request, res: Response) => {
  try {
    const { title, description, category, removeImages, date, existingImages } = req.body as any;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });

    // 1. Handle existing images (kept by user from the form)
    let keptImages: string[] = [];
    if (existingImages) {
      keptImages = Array.isArray(existingImages) ? existingImages : [existingImages];
    }

    // We base our new total images on what was strictly kept.
    // If existingImages is undefined, it means the user removed ALL old images.
    gallery.images = keptImages;

    // 2. Handle new uploaded files
    const files = (req.files as Express.Multer.File[]) || [];
    if (files.length) {
      // Use the generic uploadDir mapped to /uploads/events/ or /uploads/gallery/ based on how multer is configured
      // We will look at how your upload middleware is configured. If it saves to uploads/gallery we map it here.
      // The current upload middleware might be saving to /uploads/gallery or /uploads/events depending on configuration.
      // Based on typical express setup, let's keep the path mappings correct:
      const added = files.map((f) => `/uploads/gallery/${f.filename}`);
      gallery.images = gallery.images.concat(added);
    }

    if (title) gallery.title = title;
    if (description !== undefined) gallery.description = description;
    if (category) gallery.category = category;
    if (date) gallery.date = new Date(date);

    await gallery.save();
    res.json({ success: true, data: gallery });
  } catch (err: any) {
    console.error("Update Gallery Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Delete gallery
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err: any) {
    console.error("Delete Gallery Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};
