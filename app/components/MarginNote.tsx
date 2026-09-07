"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function MarginNote({
  children,
  rotate = -3,
  className = "",
  delay = 0.9,
  onLoad = false,
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const entrance = { opacity: 0, y: 10 };
  const settled = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const motionProps = onLoad
    ? { initial: entrance, animate: settled, transition }
    : {
        initial: entrance,
        whileInView: settled,
        viewport: { once: true, margin: "-80px" },
        transition,
      };

  return (
    <motion.p
      {...motionProps}
      style={{ rotate: prefersReducedMotion ? 0 : rotate }}
      className={`font-hand text-burgundy/70 text-xl leading-none ${className}`}
    >
      {children}
    </motion.p>
  );
}
