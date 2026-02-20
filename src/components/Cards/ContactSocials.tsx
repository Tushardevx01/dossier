import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "motion/react";

import { SiLeetcode } from "react-icons/si";
import { PiTelegramLogo } from "react-icons/pi";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

import { selfData } from "@/constant";

export const ContactSocials = () => {
  const socialLinks = [
    {
      Icon: FaGithub,
      link: `https://github.com/${selfData.socials_username.github}`,
      initial: -10,
    },
    {
      Icon: FaLinkedinIn,
      link: `https://www.linkedin.com/in/${selfData.socials_username.linkedin}`,
      initial: 10,
    },
    {
      Icon: PiTelegramLogo,
      link: `https://t.me/${selfData.socials_username.telegram}`,
      initial: -10,
    },
    {
      Icon: FaTwitter,
      link: `https://twitter.com/${selfData.socials_username.twitter}`,
      initial: 10,
    },
    {
      Icon: SiLeetcode,
      link: `https://leetcode.com/${selfData.socials_username.leetcode}`,
      initial: -10,
    },
  ];

  return (
    <ul className="flex mt-12 space-x-4">
      {socialLinks.map((social, index) => (
        <ContactSocialItem
          key={index}
          Icon={social.Icon}
          link={social.link}
          initial={social.initial}
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
  link: string;
  initial: number;
}) => {
  // Brand colors for each social platform
  const getBrandColor = () => {
    if (link.includes('github')) return '#ffffff';
    if (link.includes('linkedin')) return '#0A66C2';
    if (link.includes('telegram')) return '#26A5E4';
    if (link.includes('twitter')) return '#1DA1F2';
    if (link.includes('leetcode')) return '#FFA116';
    return '#ffffff';
  };

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
      className="h-10 w-10 flex items-center justify-center shrink-0"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group"
      >
        <motion.div
          whileHover={{
            scale: 1.15,
            y: -3,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <Icon 
            className="text-slate-400 group-hover:drop-shadow-[0_0_10px_currentColor] w-6 h-6 transition-colors duration-300" 
            style={{
              color: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = getBrandColor();
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'inherit';
            }}
          />
        </motion.div>
      </Link>
    </motion.li>
  );
};
