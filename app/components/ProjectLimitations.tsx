"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import LimitationNote from "./LimitationNote";
import NextIterationNote from "./NextIterationNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
            Limitations / Next Iteration
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

        <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <LimitationNote
            id="LIMIT_01"
            title="Limited history"
            text="The dataset covers only six months of activity, which limits the depth of behavioural baselines and long-term trend analysis."
            delay={0.1}
          />

          <LimitationNote
            id="LIMIT_02"
            title="Synthetic data"
            text="The project uses synthetic transaction and customer data, so rule performance should not be interpreted as production-ready."
            delay={0.25}
          />

          <NextIterationNote
            id="NEXT_01"
            title="Next iteration"
            text="A real next step would be to test additional scenarios such as transaction velocity, beneficiary concentration, rapid movement of funds and network-based laundering patterns."
            extraLine="Thresholds would also need out-of-sample validation before any real deployment."
            stampLabel="Reviewed"
            delay={0.4}
          />
        </div>

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
