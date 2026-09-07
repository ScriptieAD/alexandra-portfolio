"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

function fadeUpVariant(delay: number, distance = 14) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function lineVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function EvidenceMetric({
  tag,
  label,
  children,
  note,
  highlighted = false,
  delay = 0,
  className = "",
}: {
  tag: string;
  label: string;
  children: ReactNode;
  note?: string;
  highlighted?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative py-6 transition-colors duration-300 first:pt-0 ${
        highlighted ? "bg-burgundy/[0.04]" : ""
      } ${className}`}
    >
      <motion.span
        variants={lineVariant(delay)}
        style={{ transformOrigin: "left" }}
        className="mb-5 block h-px w-full bg-black/15 first:hidden"
      />

      <motion.div variants={fadeUpVariant(delay + 0.05)}>
        <p
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
            highlighted ? "text-burgundy" : "text-black/40"
          }`}
        >
          {tag}
        </p>
        <p className="text-ink mt-1 font-serif text-lg">{label}</p>
      </motion.div>

      <motion.div variants={fadeUpVariant(delay + 0.15)} className="mt-4">
        {children}
      </motion.div>

      {note && (
        <motion.p
          variants={fadeUpVariant(delay + 0.3, 8)}
          className="font-hand text-burgundy/60 mt-4 -rotate-1 text-sm leading-none"
        >
          {note}
        </motion.p>
      )}
    </div>
  );
}
