"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { mono, nasalization } from "@/app/fonts";
import { selfData } from "@/constant";

export const GitHub = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.2 });

    const githubUsername = selfData.socials_username.github;

    return (
        <section id="github" ref={ref} className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    className="mb-12 space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className={`${nasalization.className} text-4xl md:text-5xl font-bold`}
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        Built with{" "}
                        <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
                            Consistency.
                        </span>
                    </h2>
                    <p
                        className={`${mono.className} text-sm`}
                        style={{ color: "hsl(var(--foreground) / 0.4)" }}
                    >
                        Discipline compounds.
                    </p>
                </motion.div>

                {/* Contribution graph container */}
                <motion.div
                    className="github-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: "hsl(275 40% 20% / 0.5)", border: "1px solid hsl(275 30% 28% / 0.5)" }}
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: "hsl(var(--primary) / 0.8)" }}>
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </div>
                            <div>
                                <p
                                    className={`${mono.className} text-sm font-medium`}
                                    style={{ color: "hsl(var(--foreground) / 0.85)" }}
                                >
                                    {githubUsername}
                                </p>
                                <p
                                    className={`${mono.className} text-xs`}
                                    style={{ color: "hsl(var(--foreground) / 0.35)" }}
                                >
                                    Contribution Activity
                                </p>
                            </div>
                        </div>
                        <a
                            href={`https://github.com/${githubUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${mono.className} text-xs px-3 py-1.5 rounded-lg transition-all duration-200`}
                            style={{
                                color: "hsl(var(--primary) / 0.7)",
                                border: "1px solid hsl(275 30% 25% / 0.5)",
                            }}
                        >
                            View Profile →
                        </a>
                    </div>

                    {/* Contribution graph image */}
                    <div className="w-full overflow-x-auto rounded-lg">
                        <Image
                            src={process.env.NEXT_PUBLIC_GITHUB_GRAPH_URL || ""}
                            alt={`${githubUsername} GitHub contribution graph`}
                            width={900}
                            height={130}
                            className="w-full h-auto min-w-[600px]"
                            style={{ filter: "brightness(0.9) contrast(1.2)" }}
                            unoptimized
                        />
                    </div>

                    {/* Bottom hint */}
                    <p
                        className={`${mono.className} text-xs mt-4 text-center`}
                        style={{ color: "hsl(var(--foreground) / 0.25)" }}
                    >
                        Each square = a day. Each commit = intent.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
