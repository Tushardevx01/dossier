import { selfData } from "@/constant";

export interface ContactNotificationData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  requestId: string;
}

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

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + " • " + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function generateContactNotificationEmail(data: ContactNotificationData): string {
  const safeName = escapeHtml(data.name || "Unknown");
  const safeEmail = escapeHtml(data.email || "");
  const safeInquiryType = escapeHtml(data.inquiryType || "General");
  const safeMessage = escapeHtml(data.message || "(No message)");
  
  const submittedTime = formatDate(new Date());

  const site = "https://tushardevx01.tech";
  const socials = [
    {
      name: "GitHub",
      url: `https://github.com/${selfData.socials_username.github}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
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
    {
      name: "Instagram",
      url: `https://instagram.com/${selfData.socials_username.instagram}`,
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg",
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Request</title>
  <style>
    body { margin:0; padding:0; background-color:#070B14; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#F8FAFC; }
    .container { width:100%; max-width:650px; margin: 0 auto; background-color:#070B14; }
    .card { background-color:#0F172A; border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:32px; box-shadow:0 12px 36px rgba(0,0,0,0.35); }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .info-card { background-color:#111827; border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:24px; margin-top:24px; }
    .info-row { margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 16px; }
    .info-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
    .label { font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#94A3B8; font-weight:700; margin-bottom: 6px; }
    .value { font-size:16px; color:#F8FAFC; word-break: break-word; }
    .message-card { background-color:#111827; border-left:4px solid #3B82F6; border-radius:8px; padding:24px; margin-top:24px; }
    .button-container { text-align: center; margin-top: 32px; }
    .reply-btn { display:inline-block; padding:14px 28px; border-radius:12px; background: linear-gradient(135deg, #3B82F6, #6366F1); color:#ffffff; font-weight:700; text-decoration:none; font-size:15px; box-shadow:0 8px 24px rgba(59,130,246,0.3); }
    .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); color: #94A3B8; font-size: 12px; line-height: 1.6; }
    .social-icons { margin-top: 16px; }
    .social-icon { display:inline-block; width:32px; height:32px; border-radius:999px; background:#111827; border:1px solid rgba(255,255,255,0.08); text-align:center; line-height:32px; margin: 0 4px; }
  </style>
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
<body style="margin:0;padding:0;background-color:#070B14;font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;color:#F8FAFC;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070B14;width:100%;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="container" style="width:100%;max-width:650px;">
          <tr>
            <td class="card" style="background-color:#0F172A;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;box-shadow:0 12px 36px rgba(0,0,0,0.35);">
              
              <!-- Header -->
              <div class="header" style="text-align:center;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="display:inline-block;padding:8px 16px;background:rgba(59,130,246,0.1);color:#3B82F6;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:16px;">TUSHAR DEV</div>
                <div style="font-size:14px;color:#94A3B8;letter-spacing:1px;text-transform:uppercase;margin-bottom:24px;">Full Stack Developer</div>
                
                <h1 style="margin:0 0 12px 0;font-size:32px;color:#F8FAFC;font-weight:700;">New Contact Request</h1>
                <p style="margin:0;color:#94A3B8;font-size:16px;">Someone has contacted you through your portfolio.</p>
              </div>

              <!-- Information Card -->
              <div class="info-card" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-top:24px;">
                <div class="info-row" style="margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.04);padding-bottom:16px;">
                  <div class="label" style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#94A3B8;font-weight:700;margin-bottom:6px;">👤 Name</div>
                  <div class="value" style="font-size:16px;color:#F8FAFC;">${safeName}</div>
                </div>
                <div class="info-row" style="margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.04);padding-bottom:16px;">
                  <div class="label" style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#94A3B8;font-weight:700;margin-bottom:6px;">📧 Email</div>
                  <div class="value" style="font-size:16px;color:#3B82F6;"><a href="mailto:${safeEmail}" style="color:#3B82F6;text-decoration:none;">${safeEmail}</a></div>
                </div>
                <div class="info-row" style="margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.04);padding-bottom:16px;">
                  <div class="label" style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#94A3B8;font-weight:700;margin-bottom:6px;">📂 Reason</div>
                  <div class="value" style="font-size:16px;color:#F8FAFC;">${safeInquiryType}</div>
                </div>
                <div class="info-row">
                  <div class="label" style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#94A3B8;font-weight:700;margin-bottom:6px;">🕒 Submitted</div>
                  <div class="value" style="font-size:16px;color:#F8FAFC;">${submittedTime}</div>
                </div>
              </div>

              <!-- Message Block -->
              <div class="message-card" style="background-color:#111827;border-left:4px solid #3B82F6;border-radius:8px;padding:24px;margin-top:24px;">
                <div class="label" style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#94A3B8;font-weight:700;margin-bottom:12px;">💬 Message</div>
                <div style="font-size:16px;color:#F8FAFC;line-height:1.6;font-style:italic;white-space:pre-wrap;">"${safeMessage}"</div>
              </div>

              <!-- Call To Action -->
              <div class="button-container" style="text-align:center;margin-top:32px;">
                <a href="mailto:${safeEmail}" class="reply-btn" style="display:inline-block;padding:14px 28px;border-radius:12px;background:linear-gradient(135deg, #3B82F6, #6366F1);color:#ffffff;font-weight:700;text-decoration:none;font-size:15px;box-shadow:0 8px 24px rgba(59,130,246,0.3);">Reply to Sender</a>
              </div>

              <!-- Footer -->
              <div class="footer" style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);color:#94A3B8;font-size:12px;line-height:1.6;">
                <div style="font-size:14px;font-weight:700;color:#F8FAFC;margin-bottom:4px;">Visit Portfolio</div>
                <div><a href="${site}" style="color:#3B82F6;text-decoration:none;">${site.replace('https://', '')}</a></div>
                
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-top:16px;">
                  <tr>
                    ${socials.map(social => `
                      <td style="padding:0 6px;">
                        <a href="${social.url}" style="display:inline-block;width:32px;height:32px;border-radius:999px;background:#111827;border:1px solid rgba(255,255,255,0.08);text-decoration:none;line-height:32px;text-align:center;">
                          <img src="${social.icon}" alt="${social.name}" width="16" height="16" style="display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;filter:brightness(0) invert(1) opacity(0.7);" />
                        </a>
                      </td>
                    `).join("")}
                  </tr>
                </table>

                <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.04);">
                  Designed & Developed by<br/>
                  <strong style="color:#F8FAFC;">Tushar Dev</strong><br/>
                  Full Stack Developer<br/><br/>
                  © ${new Date().getFullYear()} All Rights Reserved
                </div>
              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
