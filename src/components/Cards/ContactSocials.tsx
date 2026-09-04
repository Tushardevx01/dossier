import Link from "next/link";

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
      {socialLinks.map((social) => (
        <ContactSocialItem
          key={social.key}
          Icon={SOCIAL_ICONS[social.key]}
          link={social}
        />
      ))}
    </ul>
  );
};

const ContactSocialItem = ({
  Icon,
  link,
}: {
  Icon: IconType;
  link: ContactSocialLink;
}) => {
  const iconClassName = "h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:[color:var(--social-hover)]";

  return (
    <li
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
        <div>
          <Icon className={iconClassName} />
        </div>
      </Link>
    </li>
  );
};
