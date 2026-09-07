"use client";

import { motion } from "motion/react";
import ClosingStatement from "./ClosingStatement";
import CaseStatusStamp from "./CaseStatusStamp";
import CaseMetadataFooter from "./CaseMetadataFooter";
import NextCaseLink from "./NextCaseLink";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function CaseClosed({
  nextCase,
}: {
  nextCase?: { title: string; href: string };
}) {
  return (
    <section className="bg-paper relative overflow-hidden border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.28em] text-black/40 uppercase">
            Case status
          </p>
          <p className="font-mono text-xs tracking-[0.28em] text-black/40 uppercase">
            Case 001 / FinCrime Analytics Lab
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <ClosingStatement
            delay={0}
            className="order-1 lg:order-none lg:col-span-7"
            subline="From raw transactions to behavioural monitoring, alerts, case prioritisation and threshold calibration."
          >
            Built to detect unusual behaviour.
            <br />
            Calibrated to make better decisions.
          </ClosingStatement>

          <div className="order-2 flex justify-center lg:order-none lg:col-span-5 lg:justify-end">
            <CaseStatusStamp delay={0.3} rotate={-3} className="w-[220px] sm:w-[260px]" />
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "left" }}
          className="bg-black/10 mt-20 h-px w-full lg:mt-28"
        />

        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <CaseMetadataFooter
            title="AML Transaction Monitoring Engine"
            stack="Python · Pandas · AML Analytics"
            delay={0.65}
            className="lg:max-w-md"
          />

          <NextCaseLink title={nextCase?.title} href={nextCase?.href ?? "#"} delay={0.95} />
        </div>
      </div>
    </section>
  );
}
