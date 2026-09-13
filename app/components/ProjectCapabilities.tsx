"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Capability = string | { label: string; description?: ReactNode };

const DEFAULT_CAPABILITIES: Capability[] = [
  "Transaction Monitoring",
  "Behavioural Analytics",
  "Threshold Calibration",
  "Alert Prioritisation",
  "Network Analysis",
  "Risk-based Investigation",
];

const DEFAULT_DESCRIPTION =
  "This project demonstrates my ability to translate transaction data into monitoring logic, investigate behavioural anomalies and communicate risk findings in a structured Financial Crime workflow.";

export default function ProjectCapabilities({
  eyebrow = "Capabilities",
  heading = "What this project demonstrates",
  capabilities = DEFAULT_CAPABILITIES,
  description = DEFAULT_DESCRIPTION,
}: {
  eyebrow?: string;
  heading?: string;
  capabilities?: Capability[];
  description?: ReactNode;
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
            {heading}
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: {} }}
          className="mt-14 grid w-full gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        >
          {capabilities.map((item, i) => {
            const label = typeof item === "string" ? item : item.label;
            const itemDescription = typeof item === "string" ? undefined : item.description;
            return (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="w-full max-w-full border-t-2 border-burgundy/40 py-5 pr-4 box-border"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-black/35 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-serif text-xl leading-tight">{label}</p>
                {itemDescription && (
                  <p className="mt-2 max-w-[26ch] text-[13px] leading-[1.6] text-black/55">
                    {itemDescription}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.15} className="mt-14 border-t border-black/10 pt-10">
          <p className="max-w-2xl text-lg leading-8 text-black/60">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
