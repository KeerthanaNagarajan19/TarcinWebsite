import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  privacy: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  privacy: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
export default ContactMessage;
