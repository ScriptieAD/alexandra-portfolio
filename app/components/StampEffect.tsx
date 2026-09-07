"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const toneStyles = {
  burgundy: "border-burgundy/70 text-burgundy/80",
  ink: "border-ink/50 text-ink/70",
} as const;

export default function StampEffect({
  label,
  show,
  className = "",
  rotate = -9,
  tone = "burgundy",
}: {
  label: string;
  show: boolean;
  className?: string;
  rotate?: number;
  tone?: keyof typeof toneStyles;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.7, rotate: rotate * 2 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, rotate }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className={`pointer-events-none absolute rounded-sm border-2 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase mix-blend-multiply ${toneStyles[tone]} ${className}`}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
