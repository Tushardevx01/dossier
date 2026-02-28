import { motion } from "motion/react";
import { BsSend, BsSendCheck } from "react-icons/bs";

import { Card } from "../ui/card";
import { useContactForm } from "@/hooks/useContactForm";

export const ContactFormCard = () => {
  const { formValues, isSending, isSent, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Card
        className="relative overflow-hidden border transition-all duration-300 h-full flex flex-col"
        style={{
          background: "hsl(var(--glass-bg) / 0.5)",
          borderColor: "hsl(var(--glass-border))",
        }}
      >
        <div className="relative z-10 p-8 md:p-10 flex flex-col flex-grow">
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
            <input
              type="text"
              name="website"
              value={formValues.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  name="senderName"
                  onChange={handleChange}
                  value={formValues.senderName}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-white/10 bg-white/5 transition-all duration-200 outline-none focus:border-white/30 focus:bg-white/[0.08] hover:border-white/20 placeholder:text-white/30"
                  style={{
                    color: "hsl(var(--foreground))",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  name="senderEmail"
                  onChange={handleChange}
                  value={formValues.senderEmail}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-white/10 bg-white/5 transition-all duration-200 outline-none focus:border-white/30 focus:bg-white/[0.08] hover:border-white/20 placeholder:text-white/30"
                  style={{
                    color: "hsl(var(--foreground))",
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                Type of Inquiry
              </label>
              <select
                required
                name="reasonToContact"
                onChange={handleChange}
                value={formValues.reasonToContact}
                className="w-full px-4 py-3 text-sm rounded-xl border border-white/10 bg-white/5 transition-all duration-200 outline-none focus:border-white/30 focus:bg-white/[0.08] hover:border-white/20"
                style={{
                  color: "hsl(var(--foreground))",
                }}
              >
                <option className="text-black" value="Collaboration">
                  Collaboration
                </option>
                <option className="text-black" value="Project Discussion">
                  Project Discussion
                </option>
                <option className="text-black" value="Hiring Opportunity">
                  Hiring Opportunity
                </option>
                <option className="text-black" value="Technical Conversation">
                  Technical Conversation
                </option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-grow flex flex-col"
            >
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                Message
              </label>
              <textarea
                placeholder="Share your thoughts, project ideas, or how we might work together."
                rows={5}
                name="senderMsg"
                onChange={handleChange}
                value={formValues.senderMsg}
                required
                className="w-full px-4 py-3 text-sm rounded-xl border border-white/10 bg-white/5 transition-all duration-200 outline-none focus:border-white/30 focus:bg-white/[0.08] hover:border-white/20 resize-none placeholder:text-white/30 flex-grow"
                style={{
                  color: "hsl(var(--foreground))",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ y: 0 }}
                className="w-full btn-primary px-6 py-3 rounded-xl font-medium text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : isSent ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <BsSendCheck className="w-4 h-4" />
                    </motion.div>
                    <span>Sent! Thanks for reaching out.</span>
                  </>
                ) : (
                  <>
                    <BsSend className="w-4 h-4" />
                    <span>Start a Conversation</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};
