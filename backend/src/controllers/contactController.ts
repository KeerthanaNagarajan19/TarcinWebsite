import { Request, Response } from "express";
import ContactMessage from "../models/ContactMessage";

// POST /api/contact - Save contact form data
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, company, subject, message, privacy } = req.body;

    if (!name || !email || !subject || !message || !privacy) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      company,
      subject,
      message,
      privacy,
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: "Contact message saved successfully" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
