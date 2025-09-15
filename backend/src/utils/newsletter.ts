import Announcement, { AnnounceType } from "../models/Announcement";
import Newsletter from "../models/Newsletter";
import { sendMail } from "./mailer";
import { digestTemplate } from "./emailTemplates";

const BASE = process.env.PUBLIC_BASE_URL || "https://tarcin.in";

export async function recordAnnouncement(input: {
  type: AnnounceType;
  refId: string;
  title: string;
  summary?: string;
  url: string;
  image?: string;
}) {
  try {
    await Announcement.create(input);
  } catch (e: any) {
    // unique index ensures no duplicate for same (type, refId)
    if (e?.code !== 11000) {
      console.error("recordAnnouncement failed:", e);
    }
  }
}

function periodFromQuery(period?: string) {
  if (period === "daily") return { ms: 24 * 60 * 60 * 1000, label: "Daily" };
  return { ms: 7 * 24 * 60 * 60 * 1000, label: "Weekly" };
}

/** Returns new items for a user since lastDigestAt (or now - period) filtered by prefs */
export async function collectItemsForUser(user: any, periodKey: "daily" | "weekly") {
  const prefs = user?.preferences || {
    blogs: true,
    events: true,
    courses: true,
    careers: true,
    frequency: "weekly",
  };

  const lastDigestAt: Date | null = user?.lastDigestAt || null;

  const dayMs = 24 * 60 * 60 * 1000;
  const ms = periodKey === "daily" ? dayMs : 7 * dayMs;
  const since = lastDigestAt ? lastDigestAt : new Date(Date.now() - ms);

  const types = [
    prefs.blogs && "blog",
    prefs.events && "event",
    prefs.courses && "course",
    prefs.careers && "career",
  ].filter(Boolean) as ("blog" | "event" | "course" | "career")[];

  if (types.length === 0) return [];

  const items = await Announcement.find({
    type: { $in: types },
    createdAt: { $gt: since },
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return items;
}


export async function sendDigest(periodKey: "daily" | "weekly", { dryRun = false } = {}) {
  const { label } = periodFromQuery(periodKey);

  const batch = await Newsletter.find({
    confirmed: true,
    "preferences.frequency": periodKey,
  }).lean();

  let sent = 0, skipped = 0, empty = 0, failures = 0;

  for (const sub of batch) {
    try {
      const items = await collectItemsForUser(sub, periodKey);
      if (items.length === 0) { empty++; continue; }

      const manageUrl = `${BASE}/newsletter/manage?email=${encodeURIComponent(sub.email)}&token=${encodeURIComponent(sub.unsubToken)}`;
      const html = digestTemplate({
        items: items.map(i => ({ type: i.type, title: i.title, url: i.url, summary: i.summary, image: i.image })),
        periodLabel: label,
        manageUrl,
      });

      if (!dryRun) {
        await sendMail({
          to: sub.email,
          subject: `Your ${label} updates from ${process.env.DIGEST_SENDER_NAME || "Tarcin Robotics"}`,
          html,
        });
        await Newsletter.updateOne({ _id: sub._id }, { $set: { lastDigestAt: new Date() } });
      }
      sent++;
    } catch (e) {
      console.error("digest send failed for", sub.email, e?.response?.data || e);
      failures++;
    }
  }

  return { total: batch.length, sent, empty, failures, skipped };
}
