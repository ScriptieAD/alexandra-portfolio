"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import CaseStamp from "./CaseStamp";

const DISCIPLINES = "Data Analytics · Investigation · Systems";
const DOMAIN = "Financial Crime · Fraud · Risk";
const TOOLS = "Python · Pandas · SQL";

export default function CaseFileSheet({
  className = "",
  delay = 0.28,
  onOpen,
}: {
  className?: string;
  delay?: number;
  onOpen?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97, rotate: -3 }}
      animate={!revealed ? undefined : { opacity: 1, y: 0, scale: 1, rotate: -0.6 }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 130, damping: 18, delay }}
      whileHover={prefersReducedMotion ? undefined : { y: -7, rotate: 0.4 }}
      className={`group bg-paper-card shadow-paper-lg hover:shadow-paper-xl relative rounded-[3px] p-7 transition-shadow duration-500 sm:p-9 lg:p-10 xl:p-12 ${className}`}
    >
      <CaseStamp
        className="absolute top-3 right-3 z-10 w-16 sm:top-4 sm:right-5 sm:w-24 lg:w-[124px]"
        delay={delay + 0.55}
      />

      <p className="font-mono text-[10px] tracking-[0.24em] text-black/40 uppercase">
        Case file — 04-A
      </p>

      <h3 className="mt-3 max-w-[68%] font-serif text-xl leading-[1.1] font-light sm:max-w-[75%] sm:text-[28px] lg:text-4xl">
        Financial Crime
        <br />
        <span className="italic">&amp; Fraud Analytics</span>
      </h3>

      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        whileHover={
          prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }
        }
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className="border-burgundy/50 text-burgundy/80 mt-4 inline-block rounded-sm border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.18em] uppercase"
      >
        Top secret
      </motion.span>

      <p className="mt-5 max-w-md text-sm leading-[1.7] text-black/60">
        End-to-end analytics project designed to detect, prioritise and
        investigate suspicious financial behaviour.
      </p>

      <dl className="divide-black/[0.08] border-black/[0.08] mt-7 divide-y border-t font-mono text-[11px]">
        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Disciplines
          </dt>
          <dd className="text-black/65 sm:text-right">{DISCIPLINES}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Domain
          </dt>
          <dd className="text-black/65 sm:text-right">{DOMAIN}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Tools
          </dt>
          <dd className="text-black/65 sm:text-right">{TOOLS}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Status
          </dt>
          <dd className="flex items-center gap-1.5 text-black/65 sm:text-right">
            <span className="bg-burgundy h-1.5 w-1.5 rounded-full" />
            Active investigation
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onOpen}
        aria-label="Open case: Financial Crime & Fraud Analytics"
        className="bg-burgundy hover:bg-burgundy-dark shadow-paper-xs mt-8 inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors duration-300"
      >
        Open case
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        />
      </button>
    </motion.div>
  );
}
