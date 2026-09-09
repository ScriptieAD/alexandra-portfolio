"use client";

import Reveal from "./Reveal";
import EvidenceCounter from "./EvidenceCounter";
import InsightCallout from "./InsightCallout";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function AlertDistribution() {
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
            Alert Results
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Where the signals agree
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-8 sm:gap-12">
          <EvidenceCounter
            label="LARGE_SINGLE_TXN"
            value={723}
            caption="customer-month observations triggered LARGE_SINGLE_TXN"
            rotate={-2}
            delay={0.1}
          />
          <EvidenceCounter
            label="Both rules"
            value={613}
            caption="observations triggered both HIGH_MONTHLY_VOLUME and LARGE_SINGLE_TXN"
            rotate={2}
            delay={0.22}
            emphasized
          />
          <EvidenceCounter
            label="HIGH_MONTHLY_VOLUME only"
            value={110}
            caption="HIGH_MONTHLY_VOLUME alerts did not trigger LARGE_SINGLE_TXN"
            rotate={-2}
            delay={0.34}
          />
        </div>

        <Reveal delay={0.1} className="mt-14 border-t border-black/10 pt-10">
          <p className="max-w-2xl text-lg leading-8 text-black/60">
            The overlap between rules demonstrates why multiple behavioural
            indicators are useful for prioritising alerts. High total volume
            and large individual transactions capture related but distinct
            behaviours.
          </p>
        </Reveal>

        <InsightCallout delay={0.1} className="mt-14">
          More alerts did not automatically mean more risk.
        </InsightCallout>
      </div>
    </section>
  );
}
