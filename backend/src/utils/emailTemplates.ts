const brand = {
  name: process.env.DIGEST_SENDER_NAME || "Tarcin Robotics",
  base: process.env.PUBLIC_BASE_URL || "https://tarcin.in",
  logo: `${process.env.PUBLIC_BASE_URL || ""}/tarcinblue.png`,
};

function shell({ title, bodyHtml }: { title: string; bodyHtml: string }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 0;">
    <tr>
      <td>
        <table role="presentation" width="640" align="center" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding:20px 24px;background:#0a3a86;">
              <table width="100%"><tr>
                <td align="left">
                  <img src="${brand.logo}" alt="${brand.name}" height="36" style="display:block;border:0" />
                </td>
                <td align="right" style="color:#dbeafe;font-size:14px;">${brand.name}</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f3f4f6;color:#6b7280;font-size:12px;line-height:1.5;">
              You’re receiving this because you subscribed at <a href="${brand.base}" style="color:#2563eb;text-decoration:none;">${brand.base}</a>.
              <br/>Manage preferences or unsubscribe anytime.
            </td>
          </tr>
        </table>
        <div style="text-align:center;color:#9ca3af;font-size:12px;margin-top:12px;">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeTemplate({ email, manageUrl }: { email: string; manageUrl: string }) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">Welcome, ${email.split("@")[0]} 👋</h1>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;">
      Thanks for subscribing to ${brand.name}. You’ll receive curated updates on new
      <b>blogs</b>, <b>events</b>, <b>courses</b> and <b>career opportunities</b>.
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:15px;">You can update preferences or unsubscribe anytime.</p>
    <a href="${manageUrl}"
       style="display:inline-block;background:#0a3a86;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:bold;">
       Manage Preferences
    </a>
  `;
  return shell({ title: "Welcome to Tarcin updates", bodyHtml: body });
}

export function confirmTemplate({ confirmUrl }: { confirmUrl: string }) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">Confirm your subscription</h1>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;">
      Click the button below to confirm your email and start receiving updates.
    </p>
    <a href="${confirmUrl}"
       style="display:inline-block;background:#0a3a86;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:bold;">
       Confirm Subscription
    </a>
    <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">
      If you didn’t request this, you can ignore this email.
    </p>
  `;
  return shell({ title: "Confirm your subscription", bodyHtml: body });
}

export function digestTemplate({
  items,
  periodLabel,
  manageUrl,
}: {
  items: Array<{ type: string; title: string; url: string; summary?: string; image?: string }>;
  periodLabel: string;
  manageUrl: string;
}) {
  const cards = items.map((it) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          ${it.image ? `<img src="${it.image}" alt="" width="88" height="88" style="border-radius:8px;object-fit:cover">` : ``}
          <div>
            <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;">${it.type}</div>
            <a href="${it.url}" style="font-size:16px;color:#0a3a86;font-weight:700;text-decoration:none;">${it.title}</a>
            ${it.summary ? `<div style="color:#374151;font-size:14px;margin-top:6px;">${it.summary}</div>` : ``}
          </div>
        </div>
      </td>
    </tr>
  `).join("");

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">Your ${periodLabel} updates</h1>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;">Here’s what’s new from ${brand.name}.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${cards || `<tr><td style="padding:12px 0;color:#6b7280;">No new items in this period.</td></tr>`}
    </table>
    <div style="margin-top:16px;">
      <a href="${manageUrl}" style="display:inline-block;background:#0a3a86;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:bold;">
        Manage Preferences
      </a>
    </div>
  `;
  return shell({ title: `${periodLabel} updates`, bodyHtml: body });
}
