"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  className,
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 };
  const animate = { opacity: 1, y: 0 };
  const transition = prefersReducedMotion
    ? { duration: 0.4, delay: delay * 0.4 }
    : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (onLoad) {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
