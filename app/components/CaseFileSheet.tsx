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
      className={`group bg-ivory relative rounded-[3px] p-7 shadow-[0_18px_40px_rgba(69,50,37,0.10),0_3px_8px_rgba(69,50,37,0.06)] sm:p-9 lg:rounded-none lg:bg-transparent lg:px-10 lg:pt-24 lg:pb-6 lg:shadow-none xl:px-12 xl:pt-28 xl:pb-8 ${className}`}
    >
      <CaseStamp
        className="absolute top-3 right-3 z-10 w-14 opacity-90 sm:top-4 sm:right-5 sm:w-20 lg:w-24"
        delay={delay + 0.55}
      />

      <p className="font-mono text-[10px] tracking-[0.24em] text-black/40 uppercase">
        Case file — 04-A
      </p>

      <h3 className="mt-3 max-w-[68%] font-mono text-lg leading-[1.25] tracking-tight sm:max-w-[75%] sm:text-2xl lg:text-[28px]">
        Financial Crime
        <br />
        &amp; Fraud Analytics
      </h3>

      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        whileHover={
          prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }
        }
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className="border-burgundy/50 text-burgundy/80 mt-4 inline-block rounded-sm border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.18em] uppercase lg:mt-2"
      >
        Top secret
      </motion.span>

      <p className="mt-5 max-w-md text-sm leading-[1.7] text-black/60 lg:mt-3">
        End-to-end analytics project designed to detect, prioritise and
        investigate suspicious financial behaviour.
      </p>

      <dl className="divide-black/[0.08] border-black/[0.08] mt-7 divide-y border-t font-mono text-[11px] lg:mt-3">
        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:py-1">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Disciplines
          </dt>
          <dd className="text-black/65 sm:text-right">{DISCIPLINES}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:py-1">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Domain
          </dt>
          <dd className="text-black/65 sm:text-right">{DOMAIN}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:py-1">
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            Tools
          </dt>
          <dd className="text-black/65 sm:text-right">{TOOLS}</dd>
        </div>

        <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:py-1">
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
        className="bg-burgundy hover:bg-burgundy-dark shadow-paper-xs mt-8 flex w-full items-center justify-center gap-2.5 rounded-sm py-3.5 font-mono text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors duration-300 motion-reduce:transition-none sm:py-4 lg:mt-3"
      >
        Open case
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
        />
      </button>
    </motion.div>
  );
}
