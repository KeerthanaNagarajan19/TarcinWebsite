
import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  category: "office" | "school" | "college" | "other";
  images: string[];
  date?: Date; // ✅ custom date field
  createdAt: Date;
  updatedAt: Date;
  postedBy?: mongoose.Types.ObjectId;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["office", "school", "college", "other"],
      default: "other",
    },
    images: [{ type: String }],
    date: { type: Date }, // ✅ added field for manual date input
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IGallery>("Gallery", GallerySchema);
