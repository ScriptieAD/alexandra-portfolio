"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";
import RuleEvidenceCard, { type Rule } from "./RuleEvidenceCard";
import InvestigationAnnotation from "./InvestigationAnnotation";

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

const RULES: Rule[] = [
  {
    id: "01",
    evidenceId: "Evidence_R01",
    name: "HIGH_MONTHLY_VOLUME",
    label: "Profile Deviation",
    explanation: (
      <>
        Detects customers whose monthly activity significantly{" "}
        <Marked>exceeds their expected baseline</Marked>, calibrated from
        their own customer profile.
      </>
    ),
    metric: "monthly transaction volume / expected monthly volume",
    threshold: "3.82×",
    note: "95th percentile of observed customer-month behaviour",
    code: 'monthly_behavior["high_volume_flag"] = (\n    monthly_behavior["volume_vs_expected"] > 3.815793\n)',
  },
  {
    id: "02",
    evidenceId: "Evidence_R02",
    name: "LARGE_SINGLE_TXN",
    label: "Transaction Concentration",
    explanation: (
      <>
        Detects unusually large <Marked>individual transactions</Marked>{" "}
        relative to the customer&apos;s expected monthly activity.
      </>
    ),
    metric: "maximum monthly transaction / expected monthly volume",
    threshold: "2.58×",
    note: "95th percentile of observed customer-month behaviour",
    code: 'monthly_behavior["large_single_txn_flag"] = (\n    monthly_behavior["max_vs_expected"] > 2.577652\n)',
  },
  {
    id: "03",
    evidenceId: "Evidence_R03",
    name: "FAN-OUT",
    label: "Fund Dispersion",
    explanation: (
      <>
        Identifies customers <Marked>distributing funds</Marked> across an
        unusually large number of counterparties.
      </>
    ),
    metric: "number of unique receivers",
    note: "spreading funds across many hands",
    code: 'customer_month["fan_out_flag"] = (\n    customer_month["unique_receivers"] > fan_out_threshold\n)',
  },
  {
    id: "04",
    evidenceId: "Evidence_R04",
    name: "FAN-IN",
    label: "Fund Concentration",
    explanation: (
      <>
        Identifies accounts <Marked>receiving funds</Marked> from an
        unusually large number of counterparties.
      </>
    ),
    metric: "number of unique senders",
    note: "many senders, one destination",
    code: 'customer_month["fan_in_flag"] = (\n    customer_month["unique_senders"] > fan_in_threshold\n)',
  },
];

export default function DetectionRules() {
  return (
    <section className="bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="font-hand text-burgundy/70 -rotate-2 text-xl">
            four signals. four different behaviours.
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Detection Rules
          </h2>
        </Reveal>

        <div className="mt-20 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div className="flex flex-col gap-16 lg:col-span-5">
            <RuleEvidenceCard rule={RULES[0]} rotate={-1.4} delay={0.1} />
            <RuleEvidenceCard rule={RULES[1]} rotate={1.1} delay={0.22} />
          </div>

          <div className="mt-16 flex flex-col gap-16 lg:col-span-7 lg:mt-0">
            <RuleEvidenceCard rule={RULES[2]} rotate={-0.8} delay={0.34} />
            <RuleEvidenceCard rule={RULES[3]} rotate={0.9} delay={0.46} />

            <InvestigationAnnotation className="mt-2 ml-2" rotate={-3} delay={1.15}>
              this is where money moves, not just grows
            </InvestigationAnnotation>
          </div>
        </div>
      </div>
    </section>
  );
}
