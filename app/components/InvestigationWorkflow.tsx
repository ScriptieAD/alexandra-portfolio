"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import InvestigationAnnotation from "./InvestigationAnnotation";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const DEFAULT_STEPS = [
  "Alert generated",
  "Behavioural deviation review",
  "Transaction pattern analysis",
  "Customer context",
  "Investigator decision",
];

function stepVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function InvestigationWorkflow({
  eyebrow = "Investigation Workflow",
  title = "From alert to decision",
  steps = DEFAULT_STEPS,
  description = "Rules identify unusual behaviour. Investigation determines whether the activity is explainable, requires enhanced review or should be escalated.",
  annotation = "rules flag, humans decide",
}: {
  eyebrow?: string;
  title?: string;
  steps?: string[];
  description?: ReactNode;
  annotation?: string;
}) {
  return (
    <section className="bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: {} }}
          className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-6"
        >
          {steps.map((step, i) => (
            <motion.div key={step} className="flex items-center gap-3">
              <motion.span
                variants={stepVariant(i * 0.12)}
                className={`rounded-sm border px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.12em] uppercase ${
                  i === steps.length - 1
                    ? "bg-burgundy border-burgundy text-white"
                    : "border-black/15 text-black/70"
                }`}
              >
                {step}
              </motion.span>

              {i < steps.length - 1 && (
                <motion.span variants={stepVariant(i * 0.12 + 0.06)}>
                  <ArrowRight
                    aria-hidden="true"
                    className="text-burgundy/50 h-4 w-4"
                  />
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-12">
          <p className="max-w-2xl text-lg leading-8 text-black/60">
            {description}
          </p>
        </Reveal>

        {annotation && (
          <InvestigationAnnotation className="mt-6" rotate={-2} delay={0.3}>
            {annotation}
          </InvestigationAnnotation>
        )}
      </div>
    </section>
  );
}
