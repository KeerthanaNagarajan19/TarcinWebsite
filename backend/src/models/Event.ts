import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  image?: string;
  isUpcoming: boolean;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  endDate: { type: String },
  location: { type: String, required: true },
  registrationLink: { type: String },
  image: { type: String },
  isUpcoming: { type: Boolean, default: true },
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
