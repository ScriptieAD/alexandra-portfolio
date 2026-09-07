"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function InsightCallout({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl font-serif text-2xl leading-snug italic sm:text-3xl ${className}`}
    >
      {children}
    </motion.p>
  );
}
