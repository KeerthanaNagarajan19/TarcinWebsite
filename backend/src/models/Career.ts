import mongoose, { Schema, Document } from "mongoose";

export interface ICareer extends Document {
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  applicationLink?: string;
  postedDate: Date;
}

const CareerSchema = new Schema<ICareer>({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  isActive: { type: Boolean, default: true },
  applicationLink: { type: String },
  postedDate: { type: Date, default: Date.now },
});

const Career = mongoose.model<ICareer>("Career", CareerSchema);
export default Career;
