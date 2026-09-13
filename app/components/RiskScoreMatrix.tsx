"use client";

import { motion } from "motion/react";

export type ScoreRule = { label: string; points: number };
export type PriorityBand = {
  range: string;
  label: string;
  accent: "none" | "low" | "medium" | "high" | "critical";
};

const ACCENT_BORDER: Record<PriorityBand["accent"], string> = {
  none: "border-t-black/10",
  low: "border-t-black/25",
  medium: "border-t-burgundy/35",
  high: "border-t-burgundy/65",
  critical: "border-t-burgundy",
};

const ACCENT_TEXT: Record<PriorityBand["accent"], string> = {
  none: "text-black/45",
  low: "text-black/60",
  medium: "text-ink",
  high: "text-burgundy",
  critical: "text-burgundy",
};

function fadeUpVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function RiskScoreMatrix({
  rules,
  bands,
  delay = 0,
  className = "",
}: {
  rules: ScoreRule[];
  bands: PriorityBand[];
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Scoring logic
      </p>

      <dl className="divide-black/[0.08] border-black/[0.08] mt-4 divide-y border-t font-mono text-[13px]">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.label}
            variants={fadeUpVariant(delay + i * 0.08)}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <dt className="text-black/65">{rule.label}</dt>
            <dd className="border-burgundy/40 text-burgundy shrink-0 rounded-sm border px-2.5 py-1 text-xs font-bold">
              +{rule.points}
            </dd>
          </motion.div>
        ))}
      </dl>

      <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Priority bands
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
        {bands.map((band, i) => (
          <motion.div
            key={band.label}
            variants={fadeUpVariant(delay + 0.3 + i * 0.08)}
            className={`border-t-2 pt-3 ${ACCENT_BORDER[band.accent]}`}
          >
            <p className="font-mono text-xs text-black/40">{band.range}</p>
            <p className={`mt-1 font-serif text-base leading-tight ${ACCENT_TEXT[band.accent]}`}>
              {band.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
