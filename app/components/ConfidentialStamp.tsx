"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ConfidentialStamp({
  label = "CONFIDENTIAL",
  sublabel = "RESTRICTED ACCESS",
  rotate = -7,
  className = "",
  delay = 0.6,
  onLoad = false,
}: {
  label?: string;
  sublabel?: string;
  rotate?: number;
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const entrance = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.9, rotate: rotate - 6 };
  const settled = prefersReducedMotion
    ? { opacity: 0.85 }
    : { opacity: 0.85, scale: 1, rotate };

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
    <motion.div
      {...motionProps}
      aria-hidden="true"
      className={`border-burgundy/70 text-burgundy pointer-events-none inline-block rounded-[2px] border-[1.5px] px-3.5 py-2 text-center font-mono select-none mix-blend-multiply ${className}`}
    >
      <span className="block border-b border-burgundy/40 pb-1 text-[9px] font-bold tracking-[0.22em]">
        {label}
      </span>
      <span className="mt-1 block text-[7px] tracking-[0.16em] text-burgundy/70">
        {sublabel}
      </span>
    </motion.div>
  );
}
