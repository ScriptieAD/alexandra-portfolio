"use client";

import { motion } from "motion/react";

export default function CalibrationNote({
  delay = 0,
  rotate = -1.5,
  className = "",
}: {
  delay?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: rotate - 3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 inline-block px-5 py-4 font-mono text-xs leading-[1.9] text-black/65 ${className}`}
    >
      <p className="text-burgundy/70 mb-2 text-[10px] font-bold tracking-[0.18em] uppercase">
        Calibration logic
      </p>
      <p>predicted_suspicious =</p>
      <p className="pl-3">max_threshold_ratio &gt;= threshold</p>

      <p className="mt-4 max-w-xs text-[11px] leading-relaxed text-black/50 italic">
        Ground-truth laundering labels were used only after rule generation,
        for validation and calibration, not to build the detection rules.
      </p>
    </motion.div>
  );
}
