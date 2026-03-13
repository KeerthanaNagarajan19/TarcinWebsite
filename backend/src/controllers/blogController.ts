// controllers/blog.controller.ts
import { Request, Response } from "express";
import BlogPost from "../models/Blogs";
import slugify from "slugify";
import mongoose from 'mongoose';
import { recordAnnouncement } from "../utils/newsletter";

// ✅ Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({ publishDate: -1 });

    const formatted = posts.map((post) => {
      const postObj = post.toObject();
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      return {
        ...postObj,
        id: postObj._id,
        image: postObj.image ? `${postObj.image}` : undefined,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("Error getting blog posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get blog post by slug (if you want this, ensure slug is included in your schema)
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });
    const baseUrl = `${req.protocol}://${req.get('host')}`;


    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Ensure image is absolute URL
    const postObj = post.toObject();
    const formattedPost = {
      ...postObj,
      id: postObj._id,
      image: postObj.image ? `${baseUrl}${postObj.image}` : undefined,
    };

    res.json(formattedPost);
  } catch (error) {
    console.error("Error getting blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create a new blog post
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, summary, content, author } = req.body;

    if (!title || !summary || !content || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // 🔁 Convert string to boolean
    const published = req.body.published === "true";

    // 🔁 Convert comma-separated string to array
    const tags = req.body.tags
      ? req.body.tags.split(",").map((tag: string) => tag.trim())
      : [];

    const publishDate = published ? new Date() : null;
    const image = req.file ? `/uploads/blog/${req.file.filename}` : undefined;

    const blog = new BlogPost({
      title,
      summary,
      content,
      author,
      slug,
      tags,
      image,
      published,
      publishDate,
    });

    await blog.save();
    if (blog.published) {
      const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
      await recordAnnouncement({
        type: "blog",
        refId: String(blog._id),
        title: blog.title,
        summary: blog.summary,
        url: `${base}/blog/${blog.slug}`,
        image: blog.image ? `${base}${blog.image}` : undefined,
      });
    }
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//update blog post by ID

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: any = { ...req.body };

    if (updates.title) {
      const newSlug = slugify(updates.title, { lower: true, strict: true });
      const existingPost = await BlogPost.findOne({ slug: newSlug });

      if (existingPost && existingPost._id.toString() !== id) {
        return res.status(409).json({ message: "A blog post with this title already exists." });
      }

      updates.slug = newSlug;
    }

    // 🔁 Convert string to boolean
    if (typeof updates.published === "string") {
      updates.published = updates.published === "true";
    }

    // 🔁 Convert tags string to array
    if (typeof updates.tags === "string") {
      updates.tags = updates.tags.split(",").map((tag: string) => tag.trim());
    }

    if (updates.published && !updates.publishDate) {
      updates.publishDate = new Date();
    }

    if (req.file) {
      updates.image = `/uploads/blog/${req.file.filename}`;
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Delete blog post by ID


export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const deleted = await BlogPost.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};


