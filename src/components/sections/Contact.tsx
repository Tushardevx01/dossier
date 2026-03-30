"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconType } from "react-icons";
import { useRef } from "react";

import { IoLocationOutline, IoMailOutline } from "react-icons/io5";

import { selfData } from "@/constant";
import { nasalization } from "@/app/fonts";
import { ContactFormCard, ContactSocials } from "@/components/Cards";

export const Contact = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 sm:py-28 max-w-6xl mx-auto relative overflow-hidden"
    >
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 sm:mb-16"
        >
          <motion.h2
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 relative tracking-tight ${nasalization.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ color: "hsl(var(--primary))" }}
          >
            Open{" "}
            <span style={{ color: "hsl(var(--foreground) / 0.5)" }}>Channel.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Open to engineering roles, product systems, and production-focused collaborations.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start px-0 sm:px-4 lg:px-0">
          {/* Contact Form */}
          <ContactFormCard />

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <h3
                className="text-base font-semibold tracking-[0.16em] uppercase"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Contact Information
              </h3>
              <ContactList />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3
                className="text-base font-semibold tracking-[0.16em] uppercase mb-6"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Connect Professionally
              </h3>
              <ContactSocials />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon: Icon,
  label,
  value,
  href,
}) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-5 rounded-xl transition-all duration-300 hover:bg-white/5 group cursor-pointer border border-white/10 bg-white/[0.02] hover:border-white/20"
    >
      <div className="flex items-start space-x-4">
        <div
          className="p-2.5 rounded-lg mt-0.5 flex-shrink-0"
          style={{ backgroundColor: "hsl(var(--primary) / 0.15)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">{label}</p>
          <p className="text-base text-white/85 group-hover:text-primary transition-colors duration-300 break-words">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block" aria-label={label}>
        {content}
      </Link>
    );
  }

  return content;
};

const ContactList = () => {
  return (
    <div className="space-y-6">
      <ContactItem
        icon={IoMailOutline}
        label="Email"
        value={selfData.email}
        href={`mailto:${selfData.email}`}
      />
      <ContactItem
        icon={IoLocationOutline}
        label="Location"
        value={`${selfData.current_location.city}, ${selfData.current_location.state}, ${selfData.current_location.country}`}
      />
      <ContactItem
        icon={IoMailOutline}
        label="Response Time"
        value="Typically responds within 24–48 hours"
      />
    </div>
  );
};
