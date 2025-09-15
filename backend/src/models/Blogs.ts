import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  summary: string;
  content: string;
  author: string;
  image?: string;
  tags?: string[];
  published: boolean;
  publishDate: Date;
  slug: { type: String, unique: true };
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  publishDate: { type: Date, default: null },
  slug: { type: String, unique: true },
});

const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
export default BlogPost;
