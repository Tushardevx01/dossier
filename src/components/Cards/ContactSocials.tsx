import Link from "next/link";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { type IconType } from "react-icons";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa6";

import { buildContactSocialLinks, type ContactSocialLink } from "@/config";
import { selfData } from "@/constant";

// Custom GDG Icon Component (Google Developer Groups)
// Two chevrons < > each made of two rotated pill-shaped arms.
const GDGIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 200 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="59" width="56" height="14" rx="7" fill="#4285F4" transform="rotate(35, 63, 66)" />
    <rect x="35" y="27" width="56" height="14" rx="7" fill="#EA4335" transform="rotate(-35, 63, 34)" />
    <rect x="109" y="59" width="56" height="14" rx="7" fill="#FBBC04" transform="rotate(-35, 137, 66)" />
    <rect x="109" y="27" width="56" height="14" rx="7" fill="#34A853" transform="rotate(35, 137, 34)" />
  </svg>
);

const SOCIAL_ICONS: Record<ContactSocialLink["key"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  twitter: FaTwitter,
  discord: FaDiscord,
  whatsapp: FaWhatsapp,
  gdg: GDGIcon as IconType,
};

export const ContactSocials = () => {
  const socialLinks = buildContactSocialLinks(selfData.socials_username);

  return (
    <ul className="flex flex-wrap gap-5">
      {socialLinks.map((social, index) => (
        <ContactSocialItem
          key={social.key}
          Icon={SOCIAL_ICONS[social.key]}
          link={social}
          initial={index % 2 === 0 ? -10 : 10}
        />
      ))}
    </ul>
  );
};

const ContactSocialItem = ({
  Icon,
  link,
  initial,
}: {
  Icon: IconType;
  link: ContactSocialLink;
  initial: number;
}) => {
  const iconClassName = link.isGoogleProfile
    ? "h-5 w-5 text-slate-400 opacity-70 transition-all duration-300 [filter:brightness(0)_invert(1)] group-hover:opacity-100 group-hover:[filter:none]"
    : "h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:[color:var(--social-hover)]";

  return (
    <motion.li
      initial={{ opacity: 0, y: initial }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      className="flex items-center justify-center"
    >
      <Link
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center"
        aria-label={`Visit ${link.label}`}
        style={{ "--social-hover": link.hoverColor } as CSSProperties}
      >
        <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }}>
          <Icon className={iconClassName} />
        </motion.div>
      </Link>
    </motion.li>
  );
};
