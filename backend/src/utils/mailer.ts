import { sendViaZoho } from "./zoho";

const NL_DEBUG = String(process.env.NEWSLETTER_DEBUG || "false") === "true";

export async function sendThankYouEmail(to: string) {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;">
      <h2>Welcome to Tarcin’s updates 👋</h2>
      <p>Thanks for signing up. You’ll get curated updates on blogs, events, courses, and opportunities.</p>
    </div>
  `;
  if (NL_DEBUG) console.log("[NL] sendThankYouEmail →", to);
  await sendViaZoho({ to, subject: "Thank you for subscribing!", html });
}

export async function sendMail({
  to, subject, html,
}: { to: string; subject: string; html: string; }) {
  if (NL_DEBUG) console.log("[NL] sendMail →", { to, subject, len: html.length });
  await sendViaZoho({ to, subject, html });
}
