"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import NoteFragment from "./NoteFragment";
import ReflectionQuote from "./ReflectionQuote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function InvestigationNotes() {
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
            Post-analysis / Findings
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Investigation Notes
          </h2>
        </Reveal>

        {/* NOTE 01 / 02 */}
        <div className="mt-16 flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <NoteFragment
            id="01"
            title="Behaviour beats isolated transactions"
            copy="Absolute thresholds can miss context. I compared each customer with their expected profile and their own historical behaviour, which produced more meaningful signals."
            highlight="context > raw amount"
            variant="typed"
            rotate={-1.2}
            delay={0}
            className="lg:col-span-7"
          />
          <NoteFragment
            id="02"
            title="More alerts ≠ more risk"
            copy="Cases with three triggered rules were not automatically more severe than cases with two. Threshold exceedance provided a better indication of urgency."
            highlight="signal count is not severity"
            variant="typed"
            rotate={1}
            delay={0.15}
            className="lg:col-span-5"
          />
        </div>

        {/* central pull quote — the visual anchor */}
        <ReflectionQuote delay={0.1} className="mt-20 lg:mt-28">
          Good transaction monitoring is not about generating more alerts.
          <br />
          It is about generating better decisions.
        </ReflectionQuote>

        {/* NOTE 03 / 04 */}
        <div className="mt-20 flex flex-col gap-16 lg:mt-28 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <NoteFragment
            id="03"
            title="Percentile thresholds scale with behaviour"
            copy="I set thresholds from the data's own behavioural distribution, rather than a fixed cutoff, which kept the alert queue proportional to how unusual the activity actually is."
            highlight="percentile-based, not guessed"
            stamp="Calibrated"
            variant="typed"
            rotate={-0.8}
            delay={0}
            className="lg:col-span-5"
          />
          <NoteFragment
            id="04"
            title="Two cases, two different stories"
            copy="C01222 and C00046 both triggered the same two behavioural rules, but at very different magnitudes, 68.87× versus 33.66× expected volume. Triggering the same rules does not guarantee the same underlying severity."
            highlight="same alert, different story"
            variant="memo"
            rotate={1.4}
            delay={0.15}
            className="lg:col-span-7"
          />
        </div>

        {/* NOTE 05 — closing reflection */}
        <div className="mt-16 lg:flex lg:justify-center">
          <NoteFragment
            id="05"
            title="Monitoring is iterative"
            copy="Rules, thresholds and case priorities should be reviewed repeatedly as new behaviour and outcomes become available."
            highlight="detect → review → calibrate → repeat"
            stamp="Reviewed"
            variant="memo"
            rotate={-1}
            delay={0}
            className="lg:max-w-xl"
          />
        </div>

        {/* handwritten closing annotation — fades in last */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-hand text-burgundy/70 mt-16 rotate-[-1.5deg] text-center text-xl leading-none"
        >
          what changed after looking closer
        </motion.p>
      </div>
    </section>
  );
}
