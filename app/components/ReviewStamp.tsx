"use client";

import { motion } from "motion/react";

export default function ReviewStamp({
  label = "Reviewed",
  rotate = -8,
  delay = 0,
  onLoad = false,
  className = "",
}: {
  label?: string;
  rotate?: number;
  delay?: number;
  onLoad?: boolean;
  className?: string;
}) {
  const entrance = { opacity: 0, scale: 0.7, rotate: rotate - 10 };
  const settled = { opacity: 0.85, scale: 1, rotate };
  const transition = { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const };

  const motionProps = onLoad
    ? { initial: entrance, animate: settled, transition }
    : {
        initial: entrance,
        whileInView: settled,
        viewport: { once: true, margin: "-100px" },
        transition,
      };

  return (
    <motion.div
      {...motionProps}
      className={`border-burgundy/60 text-burgundy pointer-events-none inline-block rounded-[2px] border-[1.5px] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] uppercase select-none mix-blend-multiply ${className}`}
    >
      {label}
    </motion.div>
  );
}
