import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
  confirmed: boolean;
  confirmToken?: string | null;
  unsubToken: string;               // used for one-click unsubscribe
  preferences: {
    blogs: boolean;
    events: boolean;
    courses: boolean;
    careers: boolean;
    frequency: "daily" | "weekly";
  };
  lastDigestAt?: Date | null;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  subscribedAt: { type: Date, default: Date.now },
  confirmed: { type: Boolean, default: false },
  confirmToken: { type: String, default: null },
  unsubToken: { type: String, required: true }, // generated on create
  preferences: {
    blogs: { type: Boolean, default: true },
    events: { type: Boolean, default: true },
    courses: { type: Boolean, default: true },
    careers: { type: Boolean, default: true },
    frequency: { type: String, enum: ["daily", "weekly"], default: process.env.DIGEST_DEFAULT_FREQUENCY === "daily" ? "daily" : "weekly" },
  },
  lastDigestAt: { type: Date, default: null },
});

const Newsletter = mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
export default Newsletter;
