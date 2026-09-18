"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import CaseTab from "./CaseTab";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Names match the actual rules implemented in Detection Rules below —
// nothing here is invented for the sake of the summary.
const DETECTION_METHODS = [
  { name: "High Monthly Volume", label: "profile deviation" },
  { name: "Large Single Transaction", label: "transaction concentration" },
  { name: "Cross-Border Spike", label: "behavioural deviation" },
];

const PIPELINE_STAGES = [
  "Transactions",
  "Customer Profiling",
  "Feature Engineering",
  "Threshold Calibration",
  "Alerts",
  "Cases",
  "Prioritisation",
  "Investigation",
  "Validation",
];

const KEY_RESULTS: { value: string; label: string; emphasized?: boolean }[] = [
  { value: "50K", label: "Transactions" },
  { value: "2.5K", label: "Customers" },
  { value: "2,007", label: "Alerts" },
  { value: "1,366", label: "Cases" },
  { value: "33", label: "Critical cases", emphasized: true },
];

function EyebrowLabel({ children }: { children: string }) {
  return (
    <p className="text-burgundy/70 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
      {children}
    </p>
  );
}

export default function CaseFileBrief() {
  return (
    <section className="bg-paper-quiet relative border-t border-black/10 py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CaseTab tone="manila">Case Brief</CaseTab>
            <p className="font-hand text-burgundy/70 -rotate-1 text-lg">
              the 30-second version
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-6">
            <EyebrowLabel>Problem</EyebrowLabel>
            <p className="mt-2 text-[15px] leading-[1.7] text-black/70">
              Spot potentially suspicious behaviour across 50,000
              transactions and 2,500 customers, without treating a rule
              match as proof that laundering occurred.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <EyebrowLabel>What I built</EyebrowLabel>
            <p className="mt-2 text-[15px] leading-[1.7] text-black/70">
              I built a rule-based monitoring workflow that profiles
              customer behaviour, detects anomalies, generates alerts,
              groups them into cases and prioritises cases for
              investigation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-9">
          <EyebrowLabel>Detection methods</EyebrowLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {DETECTION_METHODS.map((method) => (
              <span
                key={method.name}
                className="bg-paper-card rounded-[2px] border border-black/15 px-3 py-1.5 font-mono text-[11px] text-black/70"
              >
                {method.name}
                <span className="text-black/40"> · {method.label}</span>
              </span>
            ))}
          </div>
          <p className="mt-2.5 max-w-2xl text-[13px] leading-[1.6] text-black/50">
            Each flag compares a customer&apos;s current activity against
            their own expected monthly behaviour, not a fixed
            one-size-fits-all threshold.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-9">
          <EyebrowLabel>Pipeline</EyebrowLabel>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span
                  className={`rounded-sm border px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase ${
                    i === PIPELINE_STAGES.length - 1
                      ? "bg-burgundy border-burgundy text-white"
                      : "border-black/15 text-black/65"
                  }`}
                >
                  {stage}
                </span>
                {i < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="text-burgundy/40 h-3 w-3 shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-9 border-t border-black/10 pt-7">
          <EyebrowLabel>Key results</EyebrowLabel>
          <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-5 sm:grid-cols-5">
            {KEY_RESULTS.map((result) => (
              <div key={result.label}>
                <p
                  className={`font-mono text-2xl leading-none font-bold sm:text-3xl ${
                    result.emphasized ? "text-burgundy" : "text-ink"
                  }`}
                >
                  {result.value}
                </p>
                <p className="mt-1.5 text-[11px] tracking-[0.04em] text-black/50 uppercase">
                  {result.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-[13px] leading-[1.7] text-black/55 italic">
            Rule-based red flags support investigation prioritisation; they
            do not determine whether money laundering occurred.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
