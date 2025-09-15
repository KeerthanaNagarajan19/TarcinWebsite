import mongoose, { Schema, Document } from "mongoose";

export interface ICommunityStory extends Document {
  name: string;
  role: string;
  institution?: string;
  story: string;
  image?: string;
  approved: boolean;
  submissionDate: Date;
}

const CommunityStorySchema = new Schema<ICommunityStory>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  institution: { type: String },
  story: { type: String, required: true },
  image: { type: String },
  approved: { type: Boolean, default: false },
  submissionDate: { type: Date, default: Date.now },
});

const CommunityStory = mongoose.model<ICommunityStory>("CommunityStory", CommunityStorySchema);
export default CommunityStory;
