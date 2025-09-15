import mongoose, { Schema, Document } from "mongoose";

export type AnnounceType = "blog" | "event" | "course" | "career";

export interface IAnnouncement extends Document {
  type: AnnounceType;
  refId: string;        // Mongo _id string of the original doc
  title: string;
  summary?: string;
  url: string;          // absolute URL users can click
  image?: string;
  createdAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  type: { type: String, enum: ["blog", "event", "course", "career"], required: true, index: true },
  refId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  summary: { type: String },
  url: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now, index: true },
});

AnnouncementSchema.index({ type: 1, refId: 1 }, { unique: true });

const Announcement = mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
export default Announcement;
