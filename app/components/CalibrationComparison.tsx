"use client";

import { motion } from "motion/react";

function fadeUpVariant(delay: number, distance = 20) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function CalibrationComparison({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={`grid gap-8 sm:grid-cols-2 sm:gap-10 ${className}`}
    >
      {/* STRICT VERSION */}
      <motion.div variants={fadeUpVariant(delay)} className="border border-black/10 p-7 sm:p-8">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Strict version
        </p>
        <p className="text-ink mt-2 font-mono text-2xl font-bold">Threshold 5.0×</p>

        <div className="mt-5 space-y-3 border-t border-black/10 pt-5 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-black/40 uppercase tracking-[0.1em]">Precision</span>
            <span className="text-black/70 font-bold">81.1%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black/40 uppercase tracking-[0.1em]">Recall</span>
            <span className="text-black/70 font-bold">28.9%</span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-black/45">
          Highly selective. Missed most laundering cases.
        </p>
      </motion.div>

      {/* CALIBRATED VERSION */}
      <motion.div
        variants={fadeUpVariant(delay + 0.15)}
        className="bg-paper-card shadow-paper-sm border-burgundy/30 relative border p-7 sm:p-8"
      >
        <p className="text-burgundy font-mono text-[10px] tracking-[0.2em] uppercase">
          Calibrated version
        </p>
        <p className="text-burgundy mt-2 font-mono text-2xl font-bold">Threshold 3.0×</p>

        <div className="mt-5 space-y-3 border-t border-black/10 pt-5 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-black/40 uppercase tracking-[0.1em]">Precision</span>
            <span className="text-ink font-bold">72.1%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black/40 uppercase tracking-[0.1em]">Recall</span>
            <span className="text-ink font-bold">51.5%</span>
          </div>
        </div>

        <p className="text-black/55 mt-5 text-sm leading-relaxed">
          More than double the recall of the strict configuration, while
          retaining strong precision.
        </p>
      </motion.div>
    </motion.div>
  );
}
