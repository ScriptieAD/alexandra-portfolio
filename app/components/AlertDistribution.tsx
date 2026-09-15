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
            Alert → Case Consolidation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            From alerts to investigation cases
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <p className="text-ink font-mono text-4xl leading-none font-bold sm:text-5xl">
                2,007
              </p>
              <p className="mt-2 text-xs tracking-[0.1em] text-black/50 uppercase">
                Alerts generated
              </p>
            </div>
            <span aria-hidden="true" className="text-burgundy/50 font-mono text-2xl">
              →
            </span>
            <div>
              <p className="text-burgundy font-mono text-4xl leading-none font-bold sm:text-5xl">
                1,366
              </p>
              <p className="mt-2 text-xs tracking-[0.1em] text-black/50 uppercase">
                Investigation cases
              </p>
            </div>
          </div>
        </Reveal>

        <p className="mt-14 max-w-2xl text-lg leading-8 text-black/60">
          Multiple alerts for the same customer and month are consolidated
          into a single investigation case:
        </p>

        <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
          <EvidenceCounter
            label="1 rule"
            value={745}
            caption="cases triggered exactly one detection rule"
            rotate={-2}
            delay={0.1}
          />
          <EvidenceCounter
            label="2 rules"
            value={601}
            caption="cases triggered two of the three detection rules"
            rotate={2}
            delay={0.22}
            emphasized
          />
          <EvidenceCounter
            label="3 rules"
            value={20}
            caption="cases triggered all three detection rules"
            rotate={-2}
            delay={0.34}
          />
        </div>

        <Reveal delay={0.1} className="mt-14 border-t border-black/10 pt-10">
          <p className="max-w-2xl text-lg leading-8 text-black/60">
            The number of triggered rules adds useful context for
            prioritisation, but it does not by itself determine whether the
            underlying activity represents financial crime.
          </p>
        </Reveal>

        <InsightCallout delay={0.1} className="mt-14">
          More triggered rules did not automatically mean more risk.
        </InsightCallout>
      </div>
    </section>
  );
}
