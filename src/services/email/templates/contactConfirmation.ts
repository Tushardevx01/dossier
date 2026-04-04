/**
 * Contact Confirmation Email Template
 *
 * Production-grade email template with infrastructure-focused design.
 * Uses inline styles for email client compatibility.
 * No external CSS, no flexbox, table-based layout.
 */

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
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate contact confirmation email HTML
 */
export function generateContactConfirmationEmail(
  data: ContactConfirmationData
): string {
  const { name, inquiryType, message, requestId } = data;

  // Escape all user-provided content
  const safeName = escapeHtml(name);
  const safeInquiryType = escapeHtml(inquiryType);
  const safeMessage = escapeHtml(message);
  const safeRequestId = escapeHtml(requestId);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Message Received</title>
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
<body style="margin: 0; padding: 0; background-color: #0b0f14; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b0f14;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        
        <!-- Main container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #11161c; border: 1px solid #1f2933; border-radius: 12px;">
          <tr>
            <td style="padding: 32px;">
              
              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #4ade80; text-transform: uppercase;">MESSAGE RECEIVED</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 8px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #f1f5f9; line-height: 1.3;">Your request has entered the system.</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 32px;">
                    <span style="font-size: 14px; color: #94a3b8;">Expected Response Time: 24-48 hours</span>
                  </td>
                </tr>
              </table>
              
              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-bottom: 1px solid #1f2933; padding-bottom: 24px; margin-bottom: 24px;"></td>
                </tr>
              </table>
              
              <!-- Identity Section -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-top: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #f1f5f9;">Tushar Dev</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #94a3b8;">Full-Stack & DevOps Engineer</p>
                    <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748b;">Infrastructure &middot; Production Systems &middot; Performance</p>
                  </td>
                </tr>
              </table>
              
              <!-- Greeting -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0; font-size: 15px; color: #cbd5e1;">Hello ${safeName},</p>
                  </td>
                </tr>
              </table>
              
              <!-- Request Type -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="font-size: 11px; font-weight: 600; letter-spacing: 1px; color: #64748b; text-transform: uppercase;">REQUEST TYPE</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <span style="display: inline-block; padding: 6px 12px; background-color: #1e293b; border: 1px solid #334155; border-radius: 6px; font-size: 13px; font-weight: 500; color: #e2e8f0;">${safeInquiryType}</span>
                  </td>
                </tr>
              </table>
              
              <!-- Request Payload -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="font-size: 11px; font-weight: 600; letter-spacing: 1px; color: #64748b; text-transform: uppercase;">REQUEST PAYLOAD</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1720; border: 1px solid #1f2933; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.7; font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace; white-space: pre-wrap; word-break: break-word;">${safeMessage}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Processing Pipeline -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; font-weight: 600; letter-spacing: 1px; color: #64748b; text-transform: uppercase;">PROCESSING PIPELINE</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; vertical-align: top;">
                                <span style="display: inline-block; width: 20px; height: 20px; background-color: #166534; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 600; color: #4ade80;">1</span>
                              </td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <span style="font-size: 14px; color: #94a3b8;">Validation</span>
                                <span style="margin-left: 8px; font-size: 11px; color: #4ade80; font-weight: 500;">COMPLETE</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; vertical-align: top;">
                                <span style="display: inline-block; width: 20px; height: 20px; background-color: #1e40af; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 600; color: #60a5fa;">2</span>
                              </td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <span style="font-size: 14px; color: #94a3b8;">Manual Review</span>
                                <span style="margin-left: 8px; font-size: 11px; color: #fbbf24; font-weight: 500;">PENDING</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 24px; vertical-align: top;">
                                <span style="display: inline-block; width: 20px; height: 20px; background-color: #374151; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 600; color: #9ca3af;">3</span>
                              </td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <span style="font-size: 14px; color: #64748b;">Structured Response</span>
                                <span style="margin-left: 8px; font-size: 11px; color: #64748b; font-weight: 500;">QUEUED</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-bottom: 1px solid #1f2933; padding-bottom: 24px;"></td>
                </tr>
              </table>
              
              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-top: 24px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #64748b;">&copy; 2026 Tushar Dev</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #475569;">Kolkata, India</p>
                    <a href="https://www.tushardevx01.tech/" style="font-size: 12px; color: #4ade80; text-decoration: none;">tushardevx01.tech</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 10px; color: #374151; font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;">ref: ${safeRequestId}</span>
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
