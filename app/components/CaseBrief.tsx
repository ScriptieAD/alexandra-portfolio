"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";
import BriefItem from "./BriefItem";
import MarginNote from "./MarginNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Marked({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 14"
        className="text-burgundy/70 absolute -bottom-1 left-0 h-2.5 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M2 8 Q 25 2 50 7 T 98 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Paperclip() {
  return (
    <svg
      viewBox="0 0 44 100"
      aria-hidden="true"
      className="text-black/25 h-14 w-6 drop-shadow-[0_6px_8px_rgba(23,23,23,0.15)]"
    >
      <path
        d="M12 18 C12 8 20 2 28 2 C36 2 42 8 42 18 L42 68 C42 82 31 92 18 92 C6 92 1 83 1 71 L1 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 18 C20 13 24 10 28 10 C33 10 35 13 35 18 L35 60 C35 70 27 76 20 76 C13 76 9 71 9 63 L9 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BRIEFS: {
  index: string;
  label: string;
  span: string;
  content: ReactNode;
}[] = [
  {
    index: "01",
    label: "Problem",
    span: "lg:col-span-8",
    content:
      "Static transaction thresholds can create noisy alerts and miss changes in individual customer behaviour.",
  },
  {
    index: "02",
    label: "Data",
    span: "lg:col-span-4",
    content:
      "50,000 synthetic transactions across 2,500 customers, covering six months of transactional and KYC-style customer data.",
  },
  {
    index: "03",
    label: "Objective",
    span: "lg:col-span-4",
    content:
      "Detect unusual customer behaviour, convert rule triggers into investigation cases and calibrate alert prioritisation using precision and recall.",
  },
  {
    index: "04",
    label: "Stack",
    span: "lg:col-span-8",
    content: (
      <div className="flex flex-wrap gap-2">
        {[
          "Python",
          "Pandas",
          "Behavioural Feature Engineering",
          "Rule-Based Monitoring",
          "Threshold Calibration",
        ].map((tool) => (
          <span
            key={tool}
            className="rounded-[2px] border border-black/15 px-2.5 py-1 font-mono text-xs text-black/65"
          >
            {tool}
          </span>
        ))}
      </div>
    ),
  },
];

export default function CaseBrief() {
  return (
    <section className="bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
          {/* LEFT — title column */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-start gap-3">
                <Paperclip />
                <div>
                  <p className="font-hand text-burgundy/70 -mt-1 -rotate-2 text-xl">
                    what was actually being investigated
                  </p>

                  <h2 className="mt-3 font-serif text-5xl leading-[0.95] uppercase sm:text-6xl">
                    Case
                    <br />
                    Brief
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-sm text-base leading-[1.8] text-black/60">
                I built a rule-based AML transaction monitoring workflow that
                turns raw transaction data into customer behaviour profiles,
                generates alerts, groups them into investigation cases and
                calibrates prioritisation using{" "}
                <Marked>hidden ground-truth labels</Marked>.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — asymmetric mosaic */}
          <div className="mt-16 lg:col-span-8 lg:mt-0 lg:border-l lg:border-black/10 lg:pl-16">
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
              {BRIEFS.map((brief, i) => (
                <BriefItem
                  key={brief.index}
                  index={brief.index}
                  label={brief.label}
                  delay={0.2 + i * 0.14}
                  className={brief.span}
                >
                  {brief.content}
                </BriefItem>
              ))}
            </div>
          </div>

          {/* margin annotation — last to appear */}
          <div className="mt-16 lg:col-span-4 lg:mt-12">
            <MarginNote delay={1.35}>
              behaviour &gt; isolated transactions
            </MarginNote>
          </div>
        </div>
      </div>
    </section>
  );
}
