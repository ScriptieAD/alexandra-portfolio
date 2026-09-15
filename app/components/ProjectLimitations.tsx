"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const LIMITATIONS = [
  "The dataset is synthetic.",
  "Thresholds are calibrated on this dataset and are not production AML thresholds.",
  "Expected monthly volume is treated as a behavioural baseline.",
  "Rule-based alerts represent unusual activity, not confirmed financial crime.",
  "Ground-truth labels were used only for post-analysis validation.",
  "A production transaction-monitoring system would require richer KYC, geography, product, counterparty and historical context.",
];

export default function ProjectLimitations() {
  return (
    <section className="bg-paper relative border-t border-black/10 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
            Review Notes
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Limitations
          </h2>
        </Reveal>

        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "left" }}
          className="bg-black/10 mt-8 h-px w-full"
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: {} }}
          className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2"
        >
          {LIMITATIONS.map((item, i) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex gap-3 border-t border-black/10 py-3 text-sm leading-[1.6] text-black/60"
            >
              <span className="text-burgundy/60 font-mono text-xs">—</span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-hand text-burgundy/70 mt-14 -rotate-2 text-lg leading-none"
        >
          good systems evolve
        </motion.p>
      </div>
    </section>
  );
}
