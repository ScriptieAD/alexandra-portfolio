"use client";

import Reveal from "./Reveal";
import InsightCallout from "./InsightCallout";
import CaseComparison from "./CaseComparison";
import ThresholdRuler from "./ThresholdRuler";
import TechnicalNote from "./TechnicalNote";
import SeverityIndex from "./SeverityIndex";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function SeverityStory() {
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
            Severity Analysis
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Not every alert is equal
          </h2>
          <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-xl leading-none">
            2 rules can matter more than 3
          </p>
        </Reveal>

        <InsightCallout delay={0.15} className="mt-14 max-w-3xl">
          More alerts ≠ more risk.
        </InsightCallout>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
            Initially, I considered the number of triggered rules as a proxy
            for priority. The data showed that this was too simplistic. Some
            cases with only two rules exceeded their thresholds by more than
            20–30×, making them more urgent than cases with three weak
            signals.
          </p>
        </Reveal>

        <CaseComparison delay={0.1} className="mt-16" />

        <ThresholdRuler delay={0.1} className="mt-20 lg:mt-24" />

        <div className="mt-16 flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <TechnicalNote delay={0.1} className="lg:max-w-xs">
            <p>threshold_ratio =</p>
            <p className="pl-3">metric_value / rule_threshold</p>
            <p className="mt-3">case_severity =</p>
            <p className="pl-3">max(threshold_ratio across triggered rules)</p>
          </TechnicalNote>

          <SeverityIndex delay={0.1} className="lg:max-w-md lg:flex-1" />
        </div>
      </div>
    </section>
  );
}
