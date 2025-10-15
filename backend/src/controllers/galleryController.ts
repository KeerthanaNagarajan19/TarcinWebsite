// import { Request, Response } from "express";
// import Gallery from "../models/Gallery";
// import path from "path";

// // Create gallery post (admin) - expects multipart/form-data with files[] and fields title, description, category
// export const createGallery = async (req: Request, res: Response) => {
//   try {
//     const { title, description, category } = req.body;
//     // multer stores files in req.files
//     const files = (req.files as Express.Multer.File[]) || [];
//     const imagePaths = files.map((f) => `/uploads/gallery/${f.filename}`);

//     const newGallery = new Gallery({
//       title,
//       description,
//       category,
//       images: imagePaths,
//       postedBy: (req as any).user?.id, // if you use auth middleware
//     });

//     await newGallery.save();
//     res.status(201).json({ success: true, data: newGallery });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// export const getGalleries = async (req: Request, res: Response) => {
//   try {
//     // optional query ?category=office
//     const { category, limit = 100, page = 1 } = req.query as any;
//     const query: any = {};
//     if (category) query.category = category;

//     const perPage = Math.min(parseInt(limit), 200) || 50;
//     const skip = (Math.max(parseInt(page) || 1, 1) - 1) * perPage;

//     const [items, total] = await Promise.all([
//       Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage).lean(),
//       Gallery.countDocuments(query),
//     ]);

//     res.json({ success: true, data: items, total });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// export const getGalleryById = async (req: Request, res: Response) => {
//   try {
//     const g = await Gallery.findById(req.params.id);
//     if (!g) return res.status(404).json({ success: false, message: "Gallery post not found" });
//     res.json({ success: true, data: g });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// export const updateGallery = async (req: Request, res: Response) => {
//   try {
//     const { title, description, category, removeImages } = req.body as any;
//     const gallery = await Gallery.findById(req.params.id);
//     if (!gallery) return res.status(404).json({ success: false, message: "Not found" });

//     // handle new uploaded files
//     const files = (req.files as Express.Multer.File[]) || [];
//     if (files.length) {
//       const added = files.map((f) => `/uploads/gallery/${f.filename}`);
//       gallery.images = gallery.images.concat(added);
//     }

//     // optionally remove images (array of paths) sent from admin UI
//     if (removeImages) {
//       const removeList = Array.isArray(removeImages) ? removeImages : [removeImages];
//       gallery.images = gallery.images.filter((img) => !removeList.includes(img));
//       // Note: physically deleting files from disk is optional; implement if desired.
//     }

//     if (title) gallery.title = title;
//     if (description !== undefined) gallery.description = description;
//     if (category) gallery.category = category;

//     await gallery.save();
//     res.json({ success: true, data: gallery });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// export const deleteGallery = async (req: Request, res: Response) => {
//   try {
//     const gallery = await Gallery.findByIdAndDelete(req.params.id);
//     if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
//     // Optionally remove files from disk here
//     res.json({ success: true, message: "Deleted" });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };



import { Request, Response } from "express";
import Gallery from "../models/Gallery";
import path from "path";

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
      date: new Date(date), // ✅ save user-provided date
      postedBy: (req as any).user?.id,
    });

    await newGallery.save();
    res.status(201).json({ success: true, data: newGallery });
  } catch (err: any) {
    console.error(err);
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
      Gallery.find(query).sort({ date: -1 }).skip(skip).limit(perPage).lean(), // ✅ sort by manual date
      Gallery.countDocuments(query),
    ]);

    res.json({ success: true, data: items, total });
  } catch (err: any) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Update gallery post
// export const updateGallery = async (req: Request, res: Response) => {
//   try {
//     const { title, description, category, removeImages, date } = req.body as any;
//     const gallery = await Gallery.findById(req.params.id);
//     if (!gallery) return res.status(404).json({ success: false, message: "Not found" });

//     const files = (req.files as Express.Multer.File[]) || [];
//     if (files.length) {
//       const added = files.map((f) => `/uploads/gallery/${f.filename}`);
//       gallery.images = gallery.images.concat(added);
//     }

//     if (removeImages) {
//       const removeList = Array.isArray(removeImages) ? removeImages : [removeImages];
//       gallery.images = gallery.images.filter((img) => !removeList.includes(img));
//     }

//     if (title) gallery.title = title;
//     if (description !== undefined) gallery.description = description;
//     if (category) gallery.category = category;
//     if (date) gallery.date = new Date(date); // ✅ update manual date

//     await gallery.save();
//     res.json({ success: true, data: gallery });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Gallery.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: req.files?.map((f) => `/uploads/gallery/${f.filename}`),
      },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete gallery
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};
