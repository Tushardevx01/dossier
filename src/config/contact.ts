export const CONTACT_MAX_BODY_BYTES = 12_000;
export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000;

export interface ContactSocialUsernames {
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  discord: string;
  whatsapp: string;
  gdg: string;
}

export interface ContactSocialLink {
  key: "github" | "linkedin" | "instagram" | "twitter" | "discord" | "whatsapp" | "gdg";
  label: string;
  href: string;
  hoverColor: string;
  isGoogleProfile?: boolean;
}

function sanitizeWhatsAppNumber(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function buildContactSocialLinks(usernames: ContactSocialUsernames): ContactSocialLink[] {
  return [
    {
      key: "github",
      label: "GitHub",
      href: `https://github.com/${usernames.github}`,
      hoverColor: "#ffffff",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/in/${usernames.linkedin}`,
      hoverColor: "#0A66C2",
    },
    {
      key: "instagram",
      label: "Instagram",
      href: `https://instagram.com/${usernames.instagram}`,
      hoverColor: "#E4405F",
    },
    {
      key: "twitter",
      label: "Twitter",
      href: `https://twitter.com/${usernames.twitter}`,
      hoverColor: "#1DA1F2",
    },
    {
      key: "discord",
      label: "Discord",
      href: `https://discord.com/users/${usernames.discord}`,
      hoverColor: "#5865F2",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${sanitizeWhatsAppNumber(usernames.whatsapp)}`,
      hoverColor: "#25D366",
    },
    {
      key: "gdg",
      label: "Google Developer Profile",
      href: `https://developers.google.com/profile/u/${usernames.gdg}`,
      hoverColor: "#ffffff",
      isGoogleProfile: true,
    },
  ];
}