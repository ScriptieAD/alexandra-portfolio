"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import CaseTab from "./CaseTab";
import FlowConnector from "./FlowConnector";
import RuleMetric from "./RuleMetric";
import ThresholdStamp from "./ThresholdStamp";
import CodeDisclosure from "./CodeDisclosure";
import MarginNote from "./MarginNote";

export type Rule = {
  id: string;
  evidenceId: string;
  name: string;
  label: string;
  explanation: ReactNode;
  metric: string;
  threshold: string;
  note: string;
  code: string;
  emphasized?: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

function slideVariant(delay: number) {
  return {
    hidden: { opacity: 0, x: -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function fadeUpVariant(delay: number, distance = 10) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function RuleEvidenceCard({
  rule,
  rotate = -1.2,
  delay = 0,
  className = "",
}: {
  rule: Rule;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: `rotate(${hovered ? 0 : rotate}deg) translateY(${hovered ? -4 : 0}px)`,
        }}
        className={`bg-paper-card shadow-paper-sm relative border border-black/10 p-7 transition-[transform,box-shadow] duration-300 ease-out sm:p-9 ${
          rule.emphasized ? "shadow-paper-md lg:p-11" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute -top-6 -bottom-6 -left-3 hidden sm:block"
        >
          <FlowConnector
            orientation="vertical"
            emphasized={rule.emphasized}
            delay={delay + 0.1}
          />
        </div>

        <CaseTab tone="paper" className="absolute -top-3.5 left-6 z-10">
          {rule.evidenceId}
        </CaseTab>

        <div className="flex items-start justify-between gap-4">
          <motion.span
            variants={slideVariant(delay + 0.1)}
            className={`font-mono text-xs ${rule.emphasized ? "text-burgundy" : "text-black/40"}`}
          >
            RULE_{rule.id}
          </motion.span>

          <span className="border-burgundy/50 text-burgundy/80 rounded-sm border px-2.5 py-1 text-right font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
            {rule.label}
          </span>
        </div>

        <motion.h3
          variants={fadeUpVariant(delay + 0.18)}
          className={`mt-4 font-mono leading-tight font-bold tracking-tight ${
            rule.emphasized ? "text-burgundy text-2xl sm:text-[28px]" : "text-ink text-xl"
          }`}
        >
          {rule.name}
        </motion.h3>

        <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-black/60">
          {rule.explanation}
        </p>

        <motion.div
          variants={fadeUpVariant(delay + 0.3, 14)}
          className="mt-7 flex flex-wrap items-end justify-between gap-6"
        >
          <RuleMetric metric={rule.metric} />
          <ThresholdStamp
            value={rule.threshold}
            hovered={hovered}
            rotate={rule.emphasized ? -8 : -6}
            delay={delay + 0.42}
          />
        </motion.div>

        <div className="mt-7">
          <CodeDisclosure code={rule.code} />
        </div>

        <motion.div variants={fadeUpVariant(delay + 0.6)} className="mt-8">
          <MarginNote rotate={rule.emphasized ? 3 : -3} onLoad delay={0}>
            {rule.note}
          </MarginNote>
        </motion.div>
      </div>
    </motion.article>
  );
}
