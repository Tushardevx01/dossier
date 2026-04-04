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
  contactReason: string;
  userMessage: string;
}

export function EmailTemplate({
  userName,
  contactReason,
  userMessage,
}: EmailTemplateProps) {
  const socials = [
    {
      name: "GitHub",
      url: `https://github.com/${selfData.socials_username.github}`,
      icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
    },
    {
      name: "LinkedIn",
      url: `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    },
    {
      name: "X",
      url: `https://x.com/${selfData.socials_username.twitter}`,
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968830.png",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Message Received</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={headerSection}>
            <Row>
              <Column style={{ width: "50px" }}>
                <Img
                  src="https://raw.githubusercontent.com/Tusharii/An/refs/heads/master/public/images/logo.png"
                  alt="Logo"
                  width="44"
                  height="44"
                  style={{ borderRadius: "6px" }}
                />
              </Column>
              <Column style={{ paddingLeft: "16px" }}>
                <Text style={portfolioTitle}>Tushar Dev</Text>
                <Text style={portfolioSubtitle}>Full-Stack & DevOps Engineer</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greetingText}>Hello {userName},</Text>

            <Text style={bodyText}>
              Thank you for reaching out! Your message has been received and I appreciate you taking the time to connect.
            </Text>

            {/* Message Details Card */}
            <Section style={detailsCard}>
              <Section style={detailsRow}>
                <Text style={detailsLabel}>📝 Inquiry Type</Text>
                <Text style={detailsValue}>{contactReason}</Text>
              </Section>

              <Section style={detailsDivider} />

              <Section style={detailsRow}>
                <Text style={detailsLabel}>💬 Your Message</Text>
              </Section>
              <Section style={messageBox}>
                <Text style={messageText}>{userMessage}</Text>
              </Section>
            </Section>

            {/* Response Info */}
            <Section style={responseSection}>
              <Text style={responseTitle}>⏱️ What Happens Next?</Text>
              <Text style={responseText}>
                I typically respond to all inquiries within <strong>24–48 hours</strong>. I review each message carefully and will get back to you with a thoughtful response.
              </Text>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                In the meantime, feel free to explore my work or connect with me on social platforms below.
              </Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Social Links */}
          <Section style={socialSection}>
            <Text style={socialHeading}>Connect With Me</Text>
            <table style={socialTable}>
              <tbody>
                <tr>
                  {socials.map((social) => (
                    <td key={social.name} style={socialCell}>
                      <Link href={social.url} style={socialLink}>
                        <Img
                          src={social.icon}
                          alt={social.name}
                          width="32"
                          height="32"
                          style={socialIconStyle}
                        />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              © {currentYear} Tushar Dev. All rights reserved.
            </Text>
            <Text style={footerSubtext}>
              You received this email because you submitted the contact form on my portfolio.
            </Text>
            <Text style={contactInfo}>
              📧 {selfData.email} | 📍 {selfData.current_location.city}, {selfData.current_location.state}
            </Text>
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
  backgroundColor: "#0a0a0a",
  padding: "24px 0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  lineHeight: "1.6",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#1a1a1a",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "12px",
  overflow: "hidden",
};

const headerSection: React.CSSProperties = {
  padding: "32px 24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const portfolioTitle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0 0 4px 0",
  lineHeight: "1.2",
};

const portfolioSubtitle: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255, 255, 255, 0.6)",
  margin: "0",
  fontWeight: "400",
};

const contentSection: React.CSSProperties = {
  padding: "32px 24px",
};

const greetingText: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 16px 0",
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  color: "rgba(255, 255, 255, 0.8)",
  margin: "0 0 24px 0",
  lineHeight: "1.6",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const detailsRow: React.CSSProperties = {
  marginBottom: "12px",
};

const detailsLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.5)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 8px 0",
};

const detailsValue: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#ffffff",
  margin: "0",
};

const detailsDivider: React.CSSProperties = {
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  margin: "16px 0",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "rgba(102, 51, 238, 0.08)",
  border: "1px solid rgba(102, 51, 238, 0.2)",
  borderRadius: "6px",
  padding: "16px",
  marginTop: "8px",
};

const messageText: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.85)",
  margin: "0",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "1.5",
};

const responseSection: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const responseTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 12px 0",
};

const responseText: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.75)",
  margin: "0",
  lineHeight: "1.6",
};

const ctaSection: React.CSSProperties = {
  marginBottom: "24px",
};

const ctaText: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255, 255, 255, 0.7)",
  margin: "0",
  fontStyle: "italic",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(255, 255, 255, 0.08)",
  margin: "0",
};

const socialSection: React.CSSProperties = {
  padding: "32px 24px",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
};

const socialHeading: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.8)",
  margin: "0 0 16px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const socialTable: React.CSSProperties = {
  margin: "0 auto",
  borderCollapse: "collapse",
};

const socialCell: React.CSSProperties = {
  padding: "0 8px",
};

const socialLink: React.CSSProperties = {
  display: "inline-block",
  textDecoration: "none",
};

const socialIconStyle: React.CSSProperties = {
  borderRadius: "6px",
  display: "block",
  transition: "transform 0.2s ease-in-out",
};

const footerSection: React.CSSProperties = {
  padding: "24px",
  backgroundColor: "#0a0a0a",
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255, 255, 255, 0.5)",
  margin: "0 0 8px 0",
  fontWeight: "500",
};

const footerSubtext: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255, 255, 255, 0.4)",
  margin: "0 0 8px 0",
};

const contactInfo: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255, 255, 255, 0.35)",
  margin: "8px 0 0 0",
  fontWeight: "400",
};
