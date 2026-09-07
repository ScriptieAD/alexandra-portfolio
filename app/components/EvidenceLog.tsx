"use client";

import { motion } from "motion/react";

export default function EvidenceLog({ count }: { count: number }) {
  return (
    <div className="mt-20 flex items-center justify-between border-t border-black/10 pt-5 text-xs uppercase tracking-[0.22em] text-black/40">
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        Evidence log
      </motion.span>

      <motion.span
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {count} case file{count === 1 ? "" : "s"}
      </motion.span>
    </div>
  );
}
