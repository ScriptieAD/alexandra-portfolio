"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const toneStyles = {
  neutral: "border-black/12 bg-paper-card text-black/45",
  stamped: "border-2 border-burgundy/45 bg-paper-card/90 text-burgundy/75",
} as const;

export default function FileTab({
  children,
  className = "",
  icon,
  direction = "right",
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  direction?: "right" | "left";
  tone?: keyof typeof toneStyles;
}) {
  return (
    <motion.div
      whileHover={{ x: direction === "right" ? 4 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase shadow-sm ${toneStyles[tone]} ${className}`}
    >
      {icon}
      {children}
    </motion.div>
  );
}
