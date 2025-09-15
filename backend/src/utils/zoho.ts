// backend/src/utils/zoho.ts
import axios from "axios";
import ZohoToken from "../models/ZohoToken";

function endpoints() {
  const region = (process.env.ZOHO_REGION || "com").toLowerCase();
  const accountsHost =
    region === "in" ? "accounts.zoho.in" :
    region === "eu" ? "accounts.zoho.eu" :
    "accounts.zoho.com";
  const mailHost =
    region === "in" ? "mail.zoho.in" :
    region === "eu" ? "mail.zoho.eu" :
    "mail.zoho.com";

  return {
    AUTH_URL: `https://${accountsHost}/oauth/v2/auth`,
    TOKEN_URL: `https://${accountsHost}/oauth/v2/token`,
    MAIL_API_BASE: `https://${mailHost}/api`,
  };
}

function nowPlus(seconds: number) {
  return new Date(Date.now() + seconds * 1000);
}

async function getTokenDoc() {
  const accountId = process.env.ZOHO_ACCOUNT_ID!;
  if (!accountId) throw new Error("ZOHO_ACCOUNT_ID is not set");
  let doc = await ZohoToken.findOne({ accountId });
  if (!doc) doc = await ZohoToken.create({ accountId });
  return doc;
}

export async function exchangeCodeForTokens(code: string) {
  const { TOKEN_URL } = endpoints();
  const res = await axios.post(
    TOKEN_URL,
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      redirect_uri: process.env.ZOHO_REDIRECT_URI!,
      code,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const data = res.data; // { access_token, refresh_token, expires_in, ... }
  const doc = await getTokenDoc();
  doc.accessToken = data.access_token;
  if (data.refresh_token) doc.refreshToken = data.refresh_token; // refresh_token appears only on first consent
  doc.expiresAt = nowPlus(Number(data.expires_in || 3600));
  await doc.save();
  return doc;
}

export async function refreshAccessToken() {
  const { TOKEN_URL } = endpoints();
  const doc = await getTokenDoc();
  if (!doc.refreshToken) throw new Error("No refresh token stored. Reconnect Zoho.");

  const res = await axios.post(
    TOKEN_URL,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: doc.refreshToken,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const data = res.data; // { access_token, expires_in, ... }
  doc.accessToken = data.access_token;
  doc.expiresAt = nowPlus(Number(data.expires_in || 3600));
  await doc.save();
  return doc;
}

export async function getValidAccessToken() {
  const doc = await getTokenDoc();
  const bufferSecs = 60; // refresh a minute early
  if (doc.accessToken && doc.expiresAt && doc.expiresAt.getTime() - Date.now() > bufferSecs * 1000) {
    return doc.accessToken;
  }
  const refreshed = await refreshAccessToken();
  return refreshed.accessToken!;
}



/** Send HTML email through Zoho Mail API. Auto-refresh on 401 once. */
export async function sendViaZoho({
  to,
  subject,
  html,
  fromAddress = process.env.ZOHO_FROM_EMAIL!,
}: {
  to: string;
  subject: string;
  html: string;
  fromAddress?: string;
}) {
  const { MAIL_API_BASE } = endpoints();
  const accountId = process.env.ZOHO_ACCOUNT_ID!;
  if (!accountId) throw new Error("ZOHO_ACCOUNT_ID is not set");

  const sendOnce = async (token: string) => {
    // IMPORTANT: Use only documented keys, otherwise Zoho throws EXTRA_KEY_FOUND_IN_JSON.
    return axios.post(
      `${MAIL_API_BASE}/accounts/${accountId}/messages`,
      {
        fromAddress,         // required
        toAddress: to,       // required
        subject,             // optional but we send it
        content: html,       // required
        mailFormat: "html",  // use 'html' or 'plaintext'
        // ccAddress, bccAddress, askReceipt, encoding ... (optional)
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 30000,
      }
    );
  };

  try {
    const accessToken = await getValidAccessToken();
    return (await sendOnce(accessToken)).data;
  } catch (err: any) {
    if (err?.response?.status === 401) {
      const refreshed = await refreshAccessToken();
      return (await sendOnce(refreshed.accessToken!)).data;
    }
    throw err;
  }
}

/** --- ADD THIS: diagnostics helper --- */
export async function getZohoTokenSummary() {
  const doc = await getTokenDoc();
  return {
    accountId: doc.accountId,
    hasAccessToken: !!doc.accessToken,
    hasRefreshToken: !!doc.refreshToken,
    expiresAt: doc.expiresAt,
    expiresInSeconds: doc.expiresAt ? Math.round((doc.expiresAt.getTime() - Date.now()) / 1000) : null,
  };
}
