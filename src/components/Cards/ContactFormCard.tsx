import { motion } from "motion/react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import { BsSend, BsSendCheck } from "react-icons/bs";
import { Card } from "../ui/card";

export const ContactFormCard = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formValues, setFormValues] = useState({
    senderName: "",
    senderEmail: "",
    reasonToContact: "General inquries",
    senderMsg: "",
  });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const sendEmailPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderName: formValues.senderName,
            senderEmail: formValues.senderEmail,
            reasonToContact: formValues.reasonToContact,
            senderMsg: formValues.senderMsg,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("✅ Email sent successfully:", data.message);
          setIsSent(true);
          setFormValues({
            senderName: "",
            senderEmail: "",
            reasonToContact: "General inquries",
            senderMsg: "",
          });
          resolve(data.message);
        } else {
          console.error("❌ Failed to send email:", data.error);
          reject(new Error(data.error || "Failed to send message"));
        }
      } catch (error) {
        console.error("❌ Network error or unexpected error:", error);
        reject(error);
      } finally {
        setIsSending(false);
      }
    });

    toast.promise(sendEmailPromise, {
      loading: "Sending your message...",
      success: "Message has been received! I'll get back to you soon.",
      error: (error) => {
        if (error.message.includes("not valid")) {
          return "❌ The email address you entered is not valid (".concat(
            formValues.senderEmail,
            "). Please use a real email."
          );
        }
        return (
          error.message ||
          "An error occurred while sending your message. Please try again later."
        );
      },
    });
  };

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }
  }, [isSent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -15,
        scale: 1.03,
        rotateX: -2,
        rotateY: 2,
        transition: {
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className="group h-full perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <Card
        className="relative overflow-hidden backdrop-blur-xl border transition-all duration-700 h-full flex flex-col shadow-xl hover:shadow-2xl group-hover:shadow-luxury-hover-glow/40"
        style={{
          background: "hsl(var(--glass-bg))",
          borderColor: "hsl(var(--glass-border))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Enhanced Glass shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, hsl(var(--primary) / 0.2) 50%, transparent 70%)",
          }}
          initial={{ x: "-200%", rotate: -45 }}
          whileHover={{ x: "200%", rotate: 45 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Enhanced Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(45deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.2), hsl(var(--primary) / 0.3))",
            filter: "blur(2px)",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles effect */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/30 blur-sm"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-secondary/40 blur-sm"
          animate={{
            y: [0, 8, 0],
            x: [0, 5, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <div className="relative z-10 p-4 md:p-6 flex flex-col flex-grow">
          <form onSubmit={sendEmail} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, x: -40, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                whileFocus={{ scale: 1.02, rotateY: 2 }}
              >
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  name="senderName"
                  onChange={handleChange}
                  value={formValues.senderName}
                  className="w-full px-4 py-3 text-sm rounded-xl backdrop-blur-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30"
                  style={{
                    color: "hsl(var(--foreground))",
                    background: "hsl(var(--glass-bg))",
                    borderColor: "hsl(var(--glass-border))",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{ scale: 1.02, rotateY: -2 }}
                whileFocus={{ scale: 1.02, rotateY: -2 }}
              >
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  name="senderEmail"
                  onChange={handleChange}
                  value={formValues.senderEmail}
                  className="w-full px-4 py-3 text-sm rounded-xl backdrop-blur-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30"
                  style={{
                    color: "hsl(var(--foreground))",
                    background: "hsl(var(--glass-bg))",
                    borderColor: "hsl(var(--glass-border))",
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <select
                required
                name="reasonToContact"
                onChange={handleChange}
                value={formValues.reasonToContact}
                className="w-full px-4 py-3 text-sm rounded-xl backdrop-blur-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30"
                style={{
                  color: "hsl(var(--foreground))",
                  background: "hsl(var(--glass-bg))",
                  borderColor: "hsl(var(--glass-border))",
                }}
              >
                <option className="text-black" value="General inquries">
                  General Inquiries
                </option>
                <option className="text-black" value="Project inquiries">
                  Project Inquiries
                </option>
                <option className="text-black" value="Collaboration request">
                  Collaboration Request
                </option>
                <option className="text-black" value="Feedback/Question">
                  Feedback/Question
                </option>
                <option className="text-black" value="Bug report">
                  Bug Report
                </option>
                <option className="text-black" value="Feature request">
                  Feature Request
                </option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <textarea
                placeholder="Your Message"
                rows={4}
                name="senderMsg"
                onChange={handleChange}
                value={formValues.senderMsg}
                required
                className="w-full px-4 py-3 text-sm rounded-xl backdrop-blur-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30 resize-none"
                style={{
                  color: "hsl(var(--foreground))",
                  background: "hsl(var(--glass-bg))",
                  borderColor: "hsl(var(--glass-border))",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                type: "spring",
                stiffness: 130,
                damping: 15,
              }}
            >
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: {
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  y: 1,
                  transition: { duration: 0.1 },
                }}
                animate={{
                  boxShadow: isSending
                    ? "0 0 30px hsl(var(--primary) / 0.4)"
                    : "0 0 20px hsl(var(--primary) / 0.2)",
                }}
                className="w-full btn-primary px-6 py-3 rounded-xl font-medium text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
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
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Sending...
                    </motion.span>
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
                      <BsSendCheck className="w-5 h-5" />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Sent!
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.4 },
                      }}
                    >
                      <BsSend className="w-5 h-5" />
                    </motion.div>
                    Send Message
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
