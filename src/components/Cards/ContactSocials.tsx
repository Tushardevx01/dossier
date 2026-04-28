import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "motion/react";

import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa6";

import { selfData } from "@/constant";

// Custom GDG Icon Component (Google Developer Groups)
// Two chevrons < > each made of two rotated pill-shaped arms
// Math: pill center = apex + (half_length * cos(±35°), ±half_length * sin(35°))
// At 35°: cos≈0.819, sin≈0.574. Half-length=28 → offset=(22.9, 16.1)
const GDGIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 200 100"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ── LEFT  <  chevron, apex at (40, 50) ── */}
    {/* Blue (bottom arm) — rendered first so Red overlaps at apex */}
    <rect x="35" y="59" width="56" height="14" rx="7" fill="#4285F4"
      transform="rotate(35, 63, 66)" />
    {/* Red (top arm) */}
    <rect x="35" y="27" width="56" height="14" rx="7" fill="#EA4335"
      transform="rotate(-35, 63, 34)" />

    {/* ── RIGHT  >  chevron, apex at (160, 50) ── */}
    {/* Yellow (bottom arm) — rendered first so Green overlaps at apex */}
    <rect x="109" y="59" width="56" height="14" rx="7" fill="#FBBC04"
      transform="rotate(-35, 137, 66)" />
    {/* Green (top arm) */}
    <rect x="109" y="27" width="56" height="14" rx="7" fill="#34A853"
      transform="rotate(35, 137, 34)" />
  </svg>
);

export const ContactSocials = () => {
  const socialLinks = [
    {
      Icon: FaGithub,
      link: `https://github.com/${selfData.socials_username.github}`,
      initial: -10,
      name: "GitHub",
    },
    {
      Icon: FaLinkedinIn,
      link: `https://www.linkedin.com/in/${selfData.socials_username.linkedin}`,
      initial: 10,
      name: "LinkedIn",
    },
    {
      Icon: FaInstagram,
      link: `https://instagram.com/${selfData.socials_username.instagram}`,
      initial: -10,
      name: "Instagram",
    },

    {
      Icon: FaTwitter,
      link: `https://twitter.com/${selfData.socials_username.twitter}`,
      initial: 10,
      name: "Twitter",
    },

    {
      Icon: FaDiscord,
      link: `https://discord.com/users/${selfData.socials_username.discord}`,
      initial: 10,
      name: "Discord",
    },
    {
      Icon: FaWhatsapp,
      link: `https://wa.me/${selfData.socials_username.whatsapp.replace(/[\s+]/g, '')}`,
      initial: -10,
      name: "WhatsApp",
    },
    {
      Icon: GDGIcon as IconType,
      link: `https://developers.google.com/profile/u/${selfData.socials_username.gdg}`,
      initial: 10,
      name: "Google Developer Profile",
    },
  ];

  return (
    <ul className="flex gap-5 flex-wrap">
      {socialLinks.map((social, index) => (
        <ContactSocialItem
          key={index}
          Icon={social.Icon}
          link={social.link}
          initial={social.initial}
          name={social.name}
        />
      ))}
    </ul>
  );
};

const ContactSocialItem = ({
  Icon,
  link,
  initial,
  name,
}: {
  Icon: IconType;
  link: string;
  initial: number;
  name: string;
}) => {
  // Brand colors for each social platform
  const getBrandColor = () => {
    if (link.includes('github')) return '#ffffff';
    if (link.includes('linkedin')) return '#0A66C2';
    if (link.includes('instagram')) return '#E4405F';
    if (link.includes('twitter')) return '#1DA1F2';
    if (link.includes('discord')) return '#5865F2';
    if (link.includes('whatsapp') || link.includes('wa.me')) return '#25D366';
    if (link.includes('google') || link.includes('developers.google')) return 'inherit'; // GDG has built-in colors
    return '#ffffff';
  };

  const isGoogle = link.includes('google') || link.includes('developers.google');

  return (
    <motion.li
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: initial }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      className="flex items-center justify-center"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group"
        aria-label={`Visit ${name}`}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          <Icon
            className={`w-5 h-5 transition-all duration-300 ${isGoogle
              ? 'opacity-70 [filter:brightness(0)_invert(1)] group-hover:[filter:none] group-hover:opacity-100'
              : 'text-slate-400 group-hover:text-white'
              }`}
            style={{
              color: isGoogle ? undefined : 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!isGoogle) {
                e.currentTarget.style.color = getBrandColor();
              }
            }}
            onMouseLeave={(e) => {
              if (!isGoogle) {
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          />
        </motion.div>
      </Link>
    </motion.li>
  );
};
