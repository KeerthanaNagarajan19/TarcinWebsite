import express from "express";
import Announcement from "../models/Announcement";
import Newsletter from "../models/Newsletter";
import { sendDigest, collectItemsForUser } from "../utils/newsletter";
import { getZohoTokenSummary } from "../utils/zoho";

const router = express.Router();

// 1) List announcements (latest 50)
router.get("/api/newsletter/debug/announcements", async (_req, res) => {
  const list = await Announcement.find().sort({ createdAt: -1 }).limit(50).lean();
  res.json({ count: list.length, list });
});

// 2) List subscribers (email + confirmed + prefs)
router.get("/api/newsletter/debug/subscribers", async (_req, res) => {
  const list = await Newsletter.find().sort({ subscribedAt: -1 }).limit(100).lean();
  res.json({
    count: list.length,
    list: list.map(s => ({
      email: s.email,
      confirmed: s.confirmed,
      prefs: s.preferences,
      lastDigestAt: s.lastDigestAt,
    })),
  });
});

// 3) Preview what a specific user would receive right now
router.get("/api/newsletter/debug/preview-for", async (req, res) => {
  const email = String(req.query.email || "").trim().toLowerCase();
  const period = (String(req.query.period || "daily") === "weekly") ? "weekly" : "daily";
  const sub = await Newsletter.findOne({ email }).lean();
  if (!sub) return res.status(404).json({ message: "Subscriber not found" });
  const items = await collectItemsForUser(sub, period);
  res.json({ email, period, itemsCount: items.length, items });
});

// 4) Trigger digest manually (already have send-digest; this returns more info)
router.post("/api/newsletter/debug/send", async (req, res) => {
  const period = (String(req.query.period || "daily") === "weekly") ? "weekly" : "daily";
  const result = await sendDigest(period, { dryRun: false });
  res.json({ ok: true, period, result });
});

// 5) Zoho token status
router.get("/api/newsletter/debug/zoho", async (_req, res) => {
  const summary = await getZohoTokenSummary();
  res.json({ ok: true, summary });
});

export default router;
