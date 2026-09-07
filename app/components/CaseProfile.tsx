"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import CaseTab from "./CaseTab";

function fadeUpVariant(delay: number, distance = 16) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function CaseProfile({
  customerId,
  month,
  story,
  annotation,
  delay = 0,
  className = "",
}: {
  customerId: string;
  month: number;
  story: ReactNode;
  annotation?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpVariant(delay)} className={`relative ${className}`}>
      <div className="bg-paper-card shadow-paper-sm relative border border-black/10 p-7 sm:p-8">
        <motion.div
          variants={fadeUpVariant(delay, 10)}
          className="absolute -top-3.5 left-6 z-10"
        >
          <CaseTab tone="manila" onLoad>
            Investigation File
          </CaseTab>
        </motion.div>

        <p className="text-burgundy font-mono text-[10px] tracking-[0.22em] uppercase">
          Customer / Month
        </p>

        <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Case {customerId}
        </h3>

        <p className="mt-1 font-mono text-xs tracking-[0.14em] text-black/40 uppercase">
          Month {String(month).padStart(2, "0")}
        </p>

        <div className="mt-6 border-t border-black/10 pt-6">
          <p className="max-w-sm text-[15px] leading-[1.75] text-black/65">{story}</p>
        </div>

        {annotation && (
          <p className="font-hand text-burgundy/70 mt-6 -rotate-2 text-lg leading-none">
            &ldquo;{annotation}&rdquo;
          </p>
        )}
      </div>
    </motion.div>
  );
}
