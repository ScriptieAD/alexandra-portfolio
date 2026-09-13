"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const TONE_STYLES = {
  outline: "border-burgundy/50 text-burgundy/80 bg-paper-card/80",
  filled: "bg-burgundy border-burgundy text-white/90",
  muted: "border-black/15 text-black/45 bg-paper-card/70",
} as const;

export default function EvidenceTag({
  children,
  tone = "outline",
  rotate = 0,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_STYLES;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] uppercase shadow-sm ${TONE_STYLES[tone]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
