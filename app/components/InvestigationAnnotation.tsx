"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function InvestigationAnnotation({
  children,
  rotate = -3,
  delay = 0.6,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: prefersReducedMotion ? 0 : rotate }}
      className={`font-hand text-burgundy/70 relative text-base leading-none before:absolute before:-top-2.5 before:left-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-burgundy/50 before:content-[''] ${className}`}
    >
      {children}
    </motion.p>
  );
}
