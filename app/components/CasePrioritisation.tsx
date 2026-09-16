"use client";

import Reveal from "./Reveal";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SEVERITY_LEVELS = ["Low", "Medium", "High", "Extreme"];

const PRIORITY_DISTRIBUTION: { value: string; label: string; emphasized?: boolean }[] = [
  { value: "33", label: "Critical", emphasized: true },
  { value: "104", label: "High" },
  { value: "302", label: "Medium" },
  { value: "927", label: "Low" },
];

export default function CasePrioritisation() {
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
            Case Prioritisation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            How severity gets assigned
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">
            For every triggered rule, the project calculates how strongly the
            observed behaviour exceeds its detection threshold. The
            strongest of those ratios across all triggered rules, the{" "}
            <span className="text-ink font-semibold">maximum threshold ratio</span>,{" "}
            is then used to derive the case&apos;s severity.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-8 inline-block px-5 py-4 font-mono text-xs leading-[1.9] text-black/65">
            <p className="text-burgundy/70 mb-2 text-[10px] font-bold tracking-[0.18em] uppercase">
              Prioritisation logic
            </p>
            <p>threshold_ratio =</p>
            <p className="pl-3">metric_value / threshold</p>
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Severity levels
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {SEVERITY_LEVELS.map((level) => (
              <span
                key={level}
                className="rounded-[2px] border border-black/15 px-3 py-1.5 font-mono text-xs text-black/65 uppercase"
              >
                {level}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.34} className="mt-14">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Final case priority distribution
          </p>

          <div className="mt-4 grid max-w-2xl grid-cols-2 divide-x divide-y divide-black/10 border-t border-l border-black/10 sm:grid-cols-4 sm:divide-y-0">
            {PRIORITY_DISTRIBUTION.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={0.4 + i * 0.06}
                className="border-r border-b border-black/10 p-5 sm:p-6"
              >
                <p
                  className={`font-mono text-3xl leading-none font-bold sm:text-4xl ${
                    stat.emphasized ? "text-burgundy" : "text-ink"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-2.5 text-xs tracking-[0.04em] text-black/50 uppercase">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
