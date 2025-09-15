// backend/src/index.ts
import express from "express";
import dotenvFlow from "dotenv-flow"; // 👈 osama changes
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import app from "./app"; 
import { sendDigest } from "./utils/newsletter";

// Load correct env based on NODE_ENV
dotenvFlow.config();

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);

// Connect DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});

const SCHEDULE_DIGEST = false;
if (SCHEDULE_DIGEST) {
  setInterval(() => {
    const dayMs = 24 * 60 * 60 * 1000;
    sendDigest("daily").catch(console.error);
  }, dayMs);
}
