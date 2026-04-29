import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Row,
  Column,
  Link,
  Hr,
} from "@react-email/components";

import { selfData } from "@/constant";

interface EmailTemplateProps {
  userName: string;
  contactReason?: string;
  userMessage: string;
}

function clamp(text: string, n = 220) {
  if (!text) return "";
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > n ? trimmed.slice(0, n).trimEnd() + "…" : trimmed;
}

function smallIntroFor(reason?: string) {
  if (!reason) return "I’ve received your message and will review it personally.";
  const r = reason.toLowerCase();
  if (r.includes("project")) return "I’ve received your message — I’d be glad to learn more about your project.";
  if (r.includes("collab") || r.includes("collaboration")) return "I’ve received your message — looking forward to exploring ideas together.";
  return "I’ve received your message and will review it personally.";
}

export function EmailTemplate({ userName, contactReason, userMessage }: EmailTemplateProps) {
  const currentYear = new Date().getFullYear();

  const preview = clamp(userMessage || "");

  const accent = "#d4d4d8";
  const site = "https://tushardevx01.tech";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Thanks for reaching out</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Row>
              <Column style={{ width: "64px" }}>
                <Img src="https://tushardevx01.tech/images/logo.png" alt="TKD Logo" width="56" height="56" style={{ borderRadius: "14px" }} />
              </Column>
              <Column style={{ paddingLeft: "16px" }}>
                <Text style={nameStyle}>Tushar Kanti Dey</Text>
                <Text style={titleStyle}>Full Stack Developer & DevOps Engineer</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Body */}
          <Section style={contentSection}>
            <Text style={greetingText}>Hello {userName || "there"},</Text>

            <Text style={leadText}>{smallIntroFor(contactReason)}</Text>

            <Text style={bodyText}>I usually reply within <strong>24–48 hours</strong>. I appreciate you reaching out — I’ll be in touch soon.</Text>

            {/* Message preview card */}
            <Section style={previewCard}>
              <Text style={previewLabel}>Your Message</Text>
              <Text style={previewText}>{preview || "(No message provided)"}</Text>
            </Section>

            {/* Personal brand */}
            <Section style={brandSection}>
              <Text style={brandName}>Tushar Kanti Dey</Text>
              <Text style={brandTag}>Building scalable web products, modern interfaces, and reliable infrastructure.</Text>
            </Section>

            {/* CTAs */}
            <Section style={ctaWrap}>
              <table role="presentation" width="100" cellPadding={0} cellSpacing={0} style={{ margin: "0" }}>
                <tbody>
                  <tr>
                    <td>
                      <Link href={site} style={{ ...button, backgroundColor: "#f5f5f5", color: "#050505", border: "none", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
                        Visit Portfolio
                      </Link>
                    </td>
                    <td style={{ width: "12px" }} />
                    <td>
                      <Link href={`${site}/resume`} style={{ ...button, backgroundColor: "#111214", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff" }}>
                        View Resume
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Social icons */}
            <Section style={socialSectionStyle}>
              <Text style={socialHeading}>Connect</Text>
              <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto", textAlign: "center" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "0 6px" }}>
                      <Link href={`https://github.com/${selfData.socials_username.github}`} style={socialIconLink}>
                        <Img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" width="18" height="18" style={{ display: "block", filter: "brightness(0) invert(1)" }} />
                      </Link>
                    </td>
                    <td style={{ padding: "0 6px" }}>
                      <Link href={`https://instagram.com/${selfData.socials_username.instagram}`} style={socialIconLink}>
                        <Img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg" alt="Instagram" width="18" height="18" style={{ display: "block", filter: "brightness(0) invert(1)" }} />
                      </Link>
                    </td>
                    <td style={{ padding: "0 6px" }}>
                      <Link href={`https://www.linkedin.com/in/${selfData.socials_username.linkedin}`} style={socialIconLink}>
                        <Img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg" alt="LinkedIn" width="18" height="18" style={{ display: "block", filter: "brightness(0) invert(1)" }} />
                      </Link>
                    </td>
                    <td style={{ padding: "0 6px" }}>
                      <Link href={`https://twitter.com/${selfData.socials_username.twitter}`} style={socialIconLink}>
                        <Img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg" alt="Twitter" width="18" height="18" style={{ display: "block", filter: "brightness(0) invert(1)" }} />
                      </Link>
                    </td>
                    <td style={{ padding: "0 6px" }}>
                      <Link href={`https://developers.google.com/profile/u/${selfData.socials_username.gdg}`} style={socialIconLink}>
                        <Img src="data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='35' y='59' width='56' height='14' rx='7' fill='%23FFFFFF' transform='rotate(35, 63, 66)' /%3E%3Crect x='35' y='27' width='56' height='14' rx='7' fill='%23FFFFFF' transform='rotate(-35, 63, 34)' /%3E%3Crect x='109' y='59' width='56' height='14' rx='7' fill='%23FFFFFF' transform='rotate(-35, 137, 66)' /%3E%3Crect x='109' y='27' width='56' height='14' rx='7' fill='%23FFFFFF' transform='rotate(35, 137, 34)' /%3E%3C/svg%3E" alt="GDG" width="18" height="18" style={{ display: "block" }} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>Kolkata, India</Text>
            <Text style={footerLink}><Link href={site} style={{ color: "#ffffff", textDecoration: "none" }}>tushardevx01.tech</Link></Text>
            <Text style={smallMuted}>© {currentYear} Tushar Kanti Dey</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ===========================
   STYLING CONSTANTS
   =========================== */

const main: React.CSSProperties = {
  backgroundColor: "#050505",
  padding: "24px 0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  lineHeight: "1.5",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#0b0b0f",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  overflow: "hidden",
  padding: "32px",
  boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
};

const headerSection: React.CSSProperties = {
  padding: "0 0 20px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  marginBottom: "8px",
};

const nameStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#f5f5f5",
  margin: 0,
};

const titleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#a1a1aa",
  margin: 0,
  marginTop: "4px",
};

const contentSection: React.CSSProperties = {
  padding: "20px 0",
};

const greetingText: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#f5f5f5",
  margin: "0 0 8px 0",
};

const leadText: React.CSSProperties = {
  fontSize: "15px",
  color: "#a1a1aa",
  margin: "0 0 10px 0",
};

const bodyText: React.CSSProperties = {
  fontSize: "14px",
  color: "#a1a1aa",
  margin: "0 0 18px 0",
  lineHeight: "1.6",
};

const previewCard: React.CSSProperties = {
  backgroundColor: "#101116",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "14px",
  boxShadow: "0 0 16px rgba(0,0,0,0.18)",
};

const previewLabel: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  margin: "0 0 8px 0",
  fontWeight: 700,
};

const previewText: React.CSSProperties = {
  fontSize: "14px",
  color: "#d4d4d8",
  margin: 0,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
};

const brandSection: React.CSSProperties = {
  padding: "18px 0 6px 0",
};

const brandName: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#f5f5f5",
  margin: 0,
};

const brandTag: React.CSSProperties = {
  fontSize: "13px",
  color: "#a1a1aa",
  margin: "6px 0 0 0",
};

const ctaWrap: React.CSSProperties = {
  marginTop: "16px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const button: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "13px",
};

const footerSection: React.CSSProperties = {
  padding: "20px 0 0 0",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,0.06)",
};

const footerText: React.CSSProperties = {
  fontSize: "13px",
  color: "#a1a1aa",
  margin: 0,
};

const footerLink: React.CSSProperties = {
  fontSize: "13px",
  margin: "8px 0 0 0",
};

const smallMuted: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  margin: "6px 0 0 0",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: "12px 0",
};

const socialSectionStyle: React.CSSProperties = {
  padding: "18px 0",
  textAlign: "center",
  marginTop: "18px",
};

const socialHeading: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#a1a1aa",
  margin: "0 0 10px 0",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};

const socialIconLink: React.CSSProperties = {
  display: "inline-block",
  width: "36px",
  height: "36px",
  borderRadius: "999px",
  backgroundColor: "rgba(59,130,246,0.08)",
  border: "1px solid rgba(59,130,246,0.2)",
  textDecoration: "none",
  lineHeight: "36px",
  textAlign: "center",
  padding: "0",
  boxShadow: "0 0 12px rgba(59,130,246,0.1)",
};


