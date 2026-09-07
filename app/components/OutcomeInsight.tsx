"use client";

import { motion } from "motion/react";

export default function OutcomeInsight({
  sentence,
  comparisonBefore,
  comparisonAfter,
  delay = 0,
  className = "",
}: {
  sentence: string;
  comparisonBefore: string;
  comparisonAfter: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <p className="max-w-3xl font-serif text-3xl leading-[1.2] sm:text-4xl">{sentence}</p>

      <div className="mt-6 space-y-1 font-mono text-sm text-black/55">
        <p>{comparisonBefore}</p>
        <p className="text-ink">{comparisonAfter}</p>
      </div>
    </motion.div>
  );
}
