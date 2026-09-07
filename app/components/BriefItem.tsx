"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function BriefItem({
  index,
  label,
  children,
  className = "",
  delay = 0,
}: {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block h-px w-full origin-left bg-black/15"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{ y: -2 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pt-6"
      >
        <p className="text-burgundy/70 font-mono text-[10px] tracking-[0.22em] uppercase">
          Brief_{index}
        </p>

        <h3 className="mt-3 font-serif text-2xl leading-tight font-light sm:text-[26px]">
          {label}
        </h3>

        <div className="mt-4 max-w-md text-[15px] leading-[1.75] text-black/60">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
