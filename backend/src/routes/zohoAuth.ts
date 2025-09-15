import express from "express";
import { exchangeCodeForTokens } from "../utils/zoho";

const router = express.Router();

/** Kick off Zoho OAuth (visit this once as admin) */
router.get("/auth/zoho", (req, res) => {
  const region = (process.env.ZOHO_REGION || "com").toLowerCase();
  const accountsHost =
    region === "in" ? "accounts.zoho.in" :
    region === "eu" ? "accounts.zoho.eu" :
    "accounts.zoho.com";

  const scope = [
    "ZohoMail.accounts.READ",
    "ZohoMail.messages.CREATE",
  ].join(",");

  const authUrl =
    `https://${accountsHost}/oauth/v2/auth` +
    `?scope=${encodeURIComponent(scope)}` +
    `&client_id=${encodeURIComponent(process.env.ZOHO_CLIENT_ID!)}` +
    `&response_type=code` +
    `&access_type=offline` +          // get refresh_token
    `&prompt=consent` +               // force consent to ensure refresh_token
    `&redirect_uri=${encodeURIComponent(process.env.ZOHO_REDIRECT_URI!)}`;

  res.redirect(authUrl);
});

/** Zoho redirects back here with ?code=... */
router.get("/auth/zoho/callback", async (req, res) => {
  try {
    const code = String(req.query.code || "");
    if (!code) return res.status(400).send("Missing code");
    await exchangeCodeForTokens(code);
    res.send(`<html><body><h2>Zoho connected ✅</h2><p>You can close this window.</p></body></html>`);
  } catch (e: any) {
    console.error("Zoho callback error:", e?.response?.data || e);
    res.status(500).send("Failed to connect Zoho. Check server logs.");
  }
});

export default router;
