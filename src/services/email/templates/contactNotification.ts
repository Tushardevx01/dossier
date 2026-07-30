export interface ContactNotificationData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  requestId: string;
  submittedAt?: string;
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
    month: 'short',
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
  const site = "https://tushardevx01.tech";
  const siteLabel = "tushardevx01.tech";
  const submittedTime = escapeHtml(data.submittedAt || formatDate(new Date()));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Request</title>
  <style>
    body { margin:0; padding:0; background-color:#070B14; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#F8FAFC; }
    a { color:inherit; }
    .reply-btn:hover { filter: brightness(1.05); }
    @media only screen and (max-width: 620px) {
      .shell { padding: 18px 10px !important; }
      .card { padding: 18px !important; }
      .stack-cell { display:block !important; width:100% !important; }
      .stack-label { padding-bottom: 4px !important; }
      .stack-value { text-align:left !important; padding-top:0 !important; }
      .cta-wrap { padding-top: 14px !important; }
    }
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#070B14;">
    <tr>
      <td align="center" class="shell" style="padding:24px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:650px;">
          <tr>
            <td class="card" style="background-color:#0F172A;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:20px;box-shadow:0 12px 36px rgba(0,0,0,0.35);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:14px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);border-radius:999px;padding:6px 12px;color:#22C55E;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;line-height:1;">NEW CONTACT REQUEST</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;font-size:34px;line-height:1.1;letter-spacing:-0.03em;font-weight:800;color:#F8FAFC;">New Contact Request</td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;font-size:15px;line-height:1.6;color:#94A3B8;">Someone submitted your portfolio contact form.</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
                <tr>
                  <td class="stack-cell stack-label" style="width:34%;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;">👤 Name</td>
                  <td class="stack-cell stack-value" style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:16px;line-height:1.5;font-weight:600;color:#F8FAFC;word-break:break-word;">${safeName}</td>
                </tr>
                <tr>
                  <td class="stack-cell stack-label" style="width:34%;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;">📧 Email</td>
                  <td class="stack-cell stack-value" style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:16px;line-height:1.5;font-weight:600;color:#F8FAFC;word-break:break-word;"><a href="mailto:${safeEmail}" style="color:#3B82F6;text-decoration:none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td class="stack-cell stack-label" style="width:34%;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;">📂 Reason</td>
                  <td class="stack-cell stack-value" style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:16px;line-height:1.5;font-weight:600;color:#F8FAFC;word-break:break-word;">${safeInquiryType}</td>
                </tr>
                <tr>
                  <td class="stack-cell stack-label" style="width:34%;padding:12px 16px;font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;">🕒 Submitted</td>
                  <td class="stack-cell stack-value" style="padding:12px 16px;font-size:16px;line-height:1.5;font-weight:600;color:#F8FAFC;word-break:break-word;">${submittedTime}</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;background-color:#111827;border-left:4px solid #3B82F6;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 20px 10px 20px;font-size:13px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;">💬 Message</td>
                </tr>
                <tr>
                  <td style="padding:0 20px 20px 20px;font-size:16px;line-height:1.8;color:#F8FAFC;white-space:pre-wrap;word-break:break-word;">"${safeMessage}"</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" class="cta-wrap" style="padding-top:20px;">
                    <a href="mailto:${safeEmail}" class="reply-btn" style="display:inline-block;width:220px;height:48px;line-height:48px;border-radius:12px;background:linear-gradient(135deg,#3B82F6,#6366F1);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(59,130,246,0.3);">Reply to Sender →</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#94A3B8;padding-bottom:6px;">Visit Portfolio</td>
                      </tr>
                      <tr>
                        <td style="font-size:16px;line-height:1.4;font-weight:600;color:#F8FAFC;text-align:center;">
                          <a href="${site}" style="color:#F8FAFC;text-decoration:none;">${siteLabel} <span style="color:#3B82F6;">↗</span></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
                <tr>
                  <td align="center" style="padding-top:16px;color:#94A3B8;font-size:12px;line-height:1.7;">
                    Designed &amp; Developed by<br />
                    <strong style="color:#F8FAFC;font-size:14px;">Tushar kanti Dey</strong><br />
                    Full Stack Developer<br />
                    <a href="${site}" style="color:#94A3B8;text-decoration:none;">${siteLabel}</a><br />
                    © 2026 All Rights Reserved
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

export function contactNotificationTemplate(
  name: string,
  email: string,
  subject: string,
  message: string,
  timestamp: string
): string {
  return generateContactNotificationEmail({
    name,
    email,
    inquiryType: subject,
    message,
    requestId: timestamp,
    submittedAt: formatDate(new Date()),
  });
}
