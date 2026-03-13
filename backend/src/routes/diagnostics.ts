import express from "express";
import { getZohoTokenSummary } from "../utils/zoho";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/diagnostics/zoho", async (_req, res) => {
  try {
    const summary = await getZohoTokenSummary();
    res.json({ ok: true, summary });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || "error" });
  }
});

router.get("/api/diagnostics/db", async (_req, res) => {
  const state = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
    99: "uninitialized",
  };

  try {
    const userCount = await mongoose.connection.db.collection('users').countDocuments();
    const blogCount = await mongoose.connection.db.collection('blogs').countDocuments();
    const recentUsers = await mongoose.connection.db.collection('users')
      .find({}, { projection: { password: 0 } })
      .limit(5)
      .toArray();

    res.json({
      ok: state === 1,
      state: states[state as keyof typeof states],
      dbName: mongoose.connection.name,
      stats: {
        totalUsers: userCount,
        totalBlogs: blogCount,
      },
      preview: {
        users: recentUsers
      }
    });
  } catch (err: any) {
    res.json({
      ok: state === 1,
      state: states[state as keyof typeof states],
      dbName: mongoose.connection.name,
      error: "Could not fetch stats: " + err.message
    });
  }
});


export default router;
