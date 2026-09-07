"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const TONE_STYLES = {
  manila: "bg-manila-dark/85 text-black/55",
  paper: "bg-paper-card border border-black/10 text-black/45",
  burgundy: "bg-burgundy text-white/90",
} as const;

export default function CaseTab({
  children,
  className = "",
  tone = "manila",
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONE_STYLES;
  delay?: number;
  onLoad?: boolean;
}) {
  const entrance = { opacity: 0, y: -8 };
  const settled = { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const };

  const motionProps = onLoad
    ? { initial: entrance, animate: settled, transition }
    : {
        initial: entrance,
        whileInView: settled,
        viewport: { once: true, margin: "-80px" },
        transition,
      };

  return (
    <motion.div
      {...motionProps}
      whileHover={{ y: -3 }}
      className={`shadow-paper-xs inline-flex items-center gap-1.5 rounded-t-[3px] px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${TONE_STYLES[tone]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
