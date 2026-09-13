"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import CaseTab from "./CaseTab";

export default function TypologyCard({
  code,
  title,
  criteria,
  description,
  rotate = -1,
  delay = 0,
  emphasized = false,
  className = "",
}: {
  code: string;
  title: string;
  criteria: string;
  description: ReactNode;
  rotate?: number;
  delay?: number;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, rotate: rotate - 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -4 }}
      className={`bg-paper-card shadow-paper-sm relative border p-6 transition-shadow duration-300 hover:shadow-paper-md sm:p-7 ${
        emphasized ? "border-burgundy/30" : "border-black/10"
      } ${className}`}
    >
      <CaseTab tone="paper" className="absolute -top-3.5 left-5 z-10">
        {code}
      </CaseTab>

      <p
        className={`mt-3 font-mono text-lg leading-tight font-bold tracking-tight ${
          emphasized ? "text-burgundy" : "text-ink"
        }`}
      >
        {title}
      </p>

      <span className="border-burgundy/50 text-burgundy/80 mt-3 inline-block rounded-sm border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
        {criteria}
      </span>

      <p className="mt-4 text-[13px] leading-[1.7] text-black/60">{description}</p>
    </motion.article>
  );
}
