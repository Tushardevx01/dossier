/**
 * Contact Confirmation Email Template
 *
 * Production-grade email template with a personal, modern tone.
 * Uses inline styles for email client compatibility and table-safe layout.
 */

import { selfData } from "@/constant";

export interface ContactConfirmationData {
  name: string;
  inquiryType: string;
  message: string;
  requestId: string;
}

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return (text || "").replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate contact confirmation email HTML
 */
export function generateContactConfirmationEmail(
  data: ContactConfirmationData
): string {
  const { name, inquiryType, message } = data;

  const safeName = escapeHtml(name || "");
  const safeInquiryType = escapeHtml(inquiryType || "");
  const safeMessage = escapeHtml(message || "");

  function clamp(str: string, n = 220) {
    const t = (str || "").replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n).trimEnd() + "…" : t;
  }

  function smallIntroFor(reason: string) {
    if (!reason) return "I’ve received your message and will review it personally.";
    const r = reason.toLowerCase();
    if (r.includes("project")) return "I’ve received your message — I’d be glad to learn more about your project.";
    if (r.includes("collab") || r.includes("collaboration")) return "I’ve received your message — looking forward to exploring ideas together.";
    return "I’ve received your message and will review it personally.";
  }

  const preview = clamp(safeMessage, 220) || "(No message provided)";
  const accent = "#06b6d4";
  const site = "https://tushardevx01.tech";
  const socials = [
    {
      name: "GitHub",
      url: `https://github.com/${selfData.socials_username.github}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
    },
    {
      name: "Instagram",
      url: `https://instagram.com/${selfData.socials_username.instagram}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/in/${selfData.socials_username.linkedin}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/${selfData.socials_username.twitter}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg",
    },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thanks for reaching out</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0b0b0c;font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;color:#fff;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0b0b0c;width:100%;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#111214;border:1px solid #222;border-radius:20px;padding:32px;box-shadow:0 6px 20px rgba(2,6,23,0.6);">
          <tr>
            <td>

              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-bottom:12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:64px;vertical-align:middle;">
                          <img src="https://tushardevx01.tech/images/logo.png" alt="TKD Logo" width="56" height="56" style="display:inline-block;border:0;outline:none;text-decoration:none;border-radius:14px;" />
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <div style="font-size:18px;font-weight:700;color:#fff;margin:0;">Tushar Kanti Dey</div>
                          <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:4px;">Full Stack Developer &amp; DevOps Engineer</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(255,255,255,0.04);margin-top:12px;padding-top:20px;">
                <tr>
                  <td>
                    <h1 style="margin:0 0 12px 0;font-size:20px;color:#fff;font-weight:700;">Thanks for reaching out</h1>
                    <p style="margin:0 0 12px 0;color:rgba(255,255,255,0.85);font-size:15px;">Hello ${safeName || 'there'},</p>
                    <p style="margin:0 0 14px 0;color:rgba(255,255,255,0.75);font-size:14px;">${escapeHtml(smallIntroFor(safeInquiryType))}</p>
                    <p style="margin:0 0 18px 0;color:rgba(255,255,255,0.7);font-size:14px;">I usually reply within <strong>24–48 hours</strong>. I appreciate your interest and look forward to connecting.</p>
                  </td>
                </tr>
              </table>

              <!-- Message preview -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:12px;padding:16px;">
                    <div style="font-size:12px;color:rgba(255,255,255,0.6);font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.6px;">Your Message</div>
                    <div style="font-size:14px;color:rgba(255,255,255,0.88);line-height:1.6;white-space:pre-wrap;">${preview}</div>
                  </td>
                </tr>
              </table>

              <!-- Brand + CTAs -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="padding-top:16px;padding-bottom:6px;">
                    <div style="font-weight:700;font-size:15px;color:#fff;">Tushar Kanti Dey</div>
                    <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:6px;">Building scalable web products, modern interfaces, and reliable infrastructure.</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <a href="${site}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:${accent};color:#071127;font-weight:700;text-decoration:none;font-size:13px;">Visit Portfolio</a>
                        </td>
                        <td style="width:12px;"></td>
                        <td>
                          <a href="${site}/resume" style="display:inline-block;padding:12px 18px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);color:#dbeafe;background:transparent;font-weight:700;text-decoration:none;font-size:13px;">View Resume</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Social icons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td align="center" style="padding-top:4px;">
                    <div style="font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-weight:700;margin-bottom:10px;">Connect</div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        ${socials
                          .map(
                            (social) => `
                          <td style="padding:0 6px;">
                            <a href="${social.url}" style="display:inline-block;width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);text-decoration:none;line-height:36px;text-align:center;">
                              <img src="${social.icon}" alt="${social.name}" width="18" height="18" style="display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
                            </a>
                          </td>`
                          )
                          .join("")}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;border-top:1px solid rgba(255,255,255,0.03);padding-top:18px;">
                <tr>
                  <td align="center" style="font-size:13px;color:rgba(255,255,255,0.8);">
                    <div>Kolkata, India</div>
                    <div style="margin-top:6px;"><a href="${site}" style="color:${accent};text-decoration:none;">tushardevx01.tech</a></div>
                    <div style="margin-top:8px;font-size:12px;color:rgba(255,255,255,0.45);">© ${new Date().getFullYear()} Tushar Kanti Dey</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
