import express from "express";
import { getZohoTokenSummary } from "../utils/zoho";

const router = express.Router();

router.get("/api/diagnostics/zoho", async (_req, res) => {
  try {
    const summary = await getZohoTokenSummary();
    res.json({ ok: true, summary });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || "error" });
  }
});

export default router;
