import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: String,
  lessons: [String],
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fullDescription: String,
    image: String,
    syllabus: String,
    category: String,
    level: String,
    price: String,
    rating: Number,
    duration: String,
    students: Number,
    highlights: [String],
    modules: [moduleSchema],
    faqs: [faqSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
