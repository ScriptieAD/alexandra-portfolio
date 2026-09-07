"use client";

import { motion } from "motion/react";

export default function ThresholdStamp({
  value,
  label = "Threshold",
  rotate = -6,
  delay = 0,
  hovered = false,
  className = "",
}: {
  value: string;
  label?: string;
  rotate?: number;
  delay?: number;
  hovered?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{ rotate }}
      className={`pointer-events-none inline-block select-none ${className}`}
    >
      <div
        className={`border-burgundy/60 text-burgundy flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border-[1.5px] text-center font-mono transition-opacity duration-300 mix-blend-multiply ${
          hovered ? "opacity-100" : "opacity-[0.78]"
        }`}
      >
        <span className="text-[7px] font-bold tracking-[0.14em] uppercase opacity-70">
          {label}
        </span>
        <span className="mt-0.5 text-[13px] font-bold leading-none">{value}</span>
      </div>
    </motion.div>
  );
}
