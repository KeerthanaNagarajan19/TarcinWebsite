import { Request, Response } from "express";
import Newsletter from "../models/Newsletter";
import { randomToken } from "../utils/tokens";
import { sendMail } from "../utils/mailer";
import { welcomeTemplate } from "../utils/emailTemplates";
import { sendViaZoho } from "../utils/zoho";
import { sendDigest } from "../utils/newsletter";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const BASE = process.env.PUBLIC_BASE_URL || "https://tarcin.in";

// --- USER FACING ENDPOINTS ---

// POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const raw = req.body?.email || "";
    const email = normalizeEmail(raw);
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      // Backfill legacy documents
      const updates: Record<string, any> = {};

      if (!existing.preferences) {
        updates["preferences"] = {
          blogs: true,
          events: true,
          courses: true,
          careers: true,
          frequency:
            process.env.DIGEST_DEFAULT_FREQUENCY === "daily" ? "daily" : "weekly",
        };
      }

      if (!existing.unsubToken) {
        updates["unsubToken"] = randomToken(24);
      }

      if (existing.confirmed !== true) {
        updates["confirmed"] = true;
      }

      if (existing.confirmToken) {
        updates["confirmToken"] = null;
      }

      if (Object.keys(updates).length) {
        await Newsletter.updateOne({ _id: existing._id }, { $set: updates });
      }

      return res.status(200).json({ message: "Already subscribed" });
    }

    // New subscriber: always confirmed
    const unsubToken = randomToken(24);

    const sub = await Newsletter.create({
      email,
      confirmed: true,
      confirmToken: null,
      unsubToken,
      preferences: {
        blogs: true,
        events: true,
        courses: true,
        careers: true,
        frequency:
          process.env.DIGEST_DEFAULT_FREQUENCY === "daily" ? "daily" : "weekly",
      },
      lastDigestAt: null,
    });

    const manageUrl = `${BASE}/newsletter/manage?email=${encodeURIComponent(
      email
    )}&token=${encodeURIComponent(unsubToken)}`;
    const html = welcomeTemplate({ email, manageUrl });
    await sendMail({ to: email, subject: "Welcome to Tarcin updates", html });
    return res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/newsletter/unsubscribe
export const unsubscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(String(req.body?.email || ""));
    const token = String(req.body?.token || "");
    if (!email || !token)
      return res.status(400).json({ message: "Invalid request" });

    const removed = await Newsletter.findOneAndDelete({ email, unsubToken: token });
    if (!removed) {
      return res.status(200).json({ message: "Not subscribed" });
    }
    return res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/newsletter/preview-digest?period=weekly (admin-only later)
export const previewDigest = async (req: Request, res: Response) => {
  try {
    const period =
      String(req.query.period || "weekly") === "daily" ? "daily" : "weekly";
    const result = await sendDigest(period, { dryRun: true });
    return res.status(200).json({ ok: true, result });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "error" });
  }
};

// POST /api/newsletter/send-digest?period=weekly (admin-only later)
export const sendDigestNow = async (req: Request, res: Response) => {
  try {
    const period =
      String(req.query.period || "weekly") === "daily" ? "daily" : "weekly";
    const result = await sendDigest(period, { dryRun: false });
    return res.status(200).json({ ok: true, result });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "error" });
  }
};

// (kept) manual tester already present
export const sendTestMail = async (req: Request, res: Response) => {
  try {
    const to = String(req.query.to || "");
    if (!to) return res.status(400).json({ message: "Provide ?to=email@example.com" });

    const html = `<div style="font-family:Arial"><h3>Tarcin Test</h3><p>This is a test email via Zoho Mail API.</p></div>`;
    const result = await sendViaZoho({
      to,
      subject: "Tarcin – Zoho Mail API Test",
      html,
    });
    return res.status(200).json({ ok: true, result });
  } catch (e: any) {
    const status = e?.response?.status || 500;
    const data = e?.response?.data || e?.message || "send error";
    console.error("sendTestMail error:", data);
    return res.status(status).json({ ok: false, error: data });
  }
};

// --- ADMIN ENDPOINTS (PROTECT THESE WITH AUTH MIDDLEWARE) ---

// GET /api/newsletter/admin/list
export const adminListSubscribers = async (req: Request, res: Response) => {
  try {
    const list = await Newsletter.find().sort({ subscribedAt: -1 }).lean();
    res.json({
      count: list.length,
      list: list.map(s => ({
        id: s._id,
        email: s.email,
        confirmed: s.confirmed,
        preferences: s.preferences,
        lastDigestAt: s.lastDigestAt,
        subscribedAt: s.subscribedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscribers" });
  }
};

// PATCH /api/newsletter/admin/:id
export const adminUpdateSubscriber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update: any = {};
    if (req.body.preferences) update.preferences = req.body.preferences;
    if (typeof req.body.confirmed === "boolean") update.confirmed = req.body.confirmed;
    // You can add more fields as needed

    const updated = await Newsletter.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!updated) return res.status(404).json({ message: "Subscriber not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subscriber" });
  }
};

// DELETE /api/newsletter/admin/:id
export const adminDeleteSubscriber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Newsletter.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subscriber" });
  }
};