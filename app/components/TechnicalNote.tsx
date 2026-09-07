"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function TechnicalNote({
  label = "Formula",
  children,
  rotate = -2,
  delay = 0,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: rotate - 3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 inline-block px-5 py-4 font-mono text-xs leading-[1.9] text-black/65 ${className}`}
    >
      <p className="text-burgundy/70 mb-2 text-[10px] font-bold tracking-[0.18em] uppercase">
        {label}
      </p>
      {children}
    </motion.div>
  );
}
