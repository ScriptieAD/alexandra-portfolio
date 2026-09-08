"use client";

import { motion } from "motion/react";

export default function ArchiveLabel({
  caseNo,
  status,
  updated,
  rotate = -2,
  className = "",
  delay = 0,
}: {
  caseNo: string;
  status: string;
  updated?: string;
  rotate?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        boxShadow:
          "0 18px 40px rgba(69,50,37,0.10), 0 3px 8px rgba(69,50,37,0.06)",
      }}
      className={`bg-[#faf7f0] absolute rounded-[2px] px-2.5 py-1.5 font-mono text-[9px] leading-relaxed text-black/55 ${className}`}
    >
      <p className="font-semibold tracking-[0.12em] text-black/70 uppercase">
        Case {caseNo}
      </p>
      <p>Status: {status}</p>
      {updated && <p className="text-black/40">Last updated: {updated}</p>}
    </motion.div>
  );
}
