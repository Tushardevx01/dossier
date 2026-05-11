import Link from "next/link";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { type IconType } from "react-icons";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa6";

import { buildContactSocialLinks, type ContactSocialLink } from "@/config";
import { selfData } from "@/constant";

const SOCIAL_ICONS: Record<ContactSocialLink["key"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  twitter: FaTwitter,
  discord: FaDiscord,
  whatsapp: FaWhatsapp,
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
  const iconClassName = "h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:[color:var(--social-hover)]";

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
