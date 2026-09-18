"use client";

import Reveal from "./Reveal";
import CaseTab from "./CaseTab";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STATS: { value: string; label: string; emphasized?: boolean }[] = [
  { value: "50K", label: "Transactions analysed" },
  { value: "2.5K", label: "Customer profiles" },
  { value: "3", label: "Behavioural detection rules" },
  { value: "2,007", label: "Alerts generated" },
  { value: "1,366", label: "Investigation cases" },
  { value: "33", label: "Critical cases", emphasized: true },
];

export default function InvestigationAtAGlance() {
  return (
    <section className="bg-paper-deep relative border-t border-black/10 py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <CaseTab tone="paper">Investigation at a glance</CaseTab>
        </Reveal>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border-t border-l border-black/10 sm:grid-cols-3 sm:divide-y-0 lg:flex-1">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={0.08 * i}
                className="border-r border-b border-black/10 p-5 sm:p-6"
              >
                <p
                  className={`font-mono text-4xl leading-none font-bold sm:text-5xl ${
                    stat.emphasized ? "text-burgundy" : "text-ink"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-2.5 max-w-[16ch] text-xs leading-snug tracking-[0.04em] text-black/50 uppercase">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={0.4}
            className="max-w-md lg:shrink-0 lg:border-l lg:border-black/10 lg:pl-16"
          >
            <p className="text-[15px] leading-[1.75] text-black/60">
              I built an end-to-end behavioural transaction monitoring
              workflow that compares customer activity against expected and
              historical behaviour, generates rule-based alerts,
              consolidates them into investigation cases and assigns
              risk-based case priority.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
