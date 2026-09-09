"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import CaseTab from "./CaseTab";
import CaseProfile from "./CaseProfile";
import EvidenceMetric from "./EvidenceMetric";
import CashDepositTimeline, { type CashDeposit } from "./CashDepositTimeline";
import TriggeredRules from "./TriggeredRules";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const currencyFmt = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ratioFmt = (v: number) => `${v.toFixed(2)}×`;

const DEPOSITS: CashDeposit[] = [
  { day: "MAY 09", time: "19:00", amount: "8,659.62", channel: "ATM" },
  { day: "MAY 09", time: "20:00", amount: "8,745.48", channel: "ATM" },
  { day: "MAY 10", time: "00:00", amount: "8,938.82", channel: "ATM" },
  { day: "MAY 11", time: "15:00", amount: "9,751.68", channel: "ATM" },
  { day: "MAY 11", time: "16:00", amount: "9,757.70", channel: "Branch" },
  { day: "MAY 11", time: "17:00", amount: "8,850.89", channel: "ATM" },
  { day: "MAY 11", time: "18:00", amount: "9,751.02", channel: "ATM" },
  { day: "MAY 11", time: "22:00", amount: "8,901.62", channel: "ATM" },
  { day: "MAY 12", time: "08:00", amount: "8,924.18", channel: "Branch" },
  { day: "MAY 12", time: "18:00", amount: "9,762.61", channel: "ATM" },
];

const TRIGGERED_RULES = ["HIGH_MONTHLY_VOLUME", "FAN-OUT"];

const OBSERVATIONS = [
  "Monthly volume reached 22.36× the customer's expected activity.",
  "Ten cash deposits were concentrated across a four-day period.",
  "Cash deposits totalled approximately 90.1k.",
  "Activity occurred across both ATM and branch channels.",
  "The customer sent funds to 40 unique receivers.",
  "The combination of volume deviation, cash activity and broad counterparty dispersion justified escalation.",
];

function fadeUpVariant(delay: number, distance = 20) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function barVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.8, delay, ease: [0.65, 0, 0.35, 1] as const },
    },
  };
}

function AnimatedNumber({
  value,
  active,
  delay = 0,
  duration = 1.1,
  formatter,
  className = "",
}: {
  value: number;
  active: boolean;
  delay?: number;
  duration?: number;
  formatter: (v: number) => string;
  className?: string;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, formatter);

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, value, { duration, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [active, motionValue, value, delay, duration]);

  return (
    <motion.span className={className}>{display}</motion.span>
  );
}

export default function CaseSpotlight() {
  const [sectionInView, setSectionInView] = useState(false);

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
            Featured Investigation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Case Spotlight
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setSectionInView(true)}
          variants={{ hidden: {}, show: {} }}
        >
          <motion.div variants={fadeUpVariant(0, 10)} className="mt-10">
            <CaseTab tone="manila" onLoad>
              Investigation File / C02177 / Month 05
            </CaseTab>
          </motion.div>

          <div className="mt-10 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-16">
            {/* LEFT — case profile */}
            <div className="order-1 lg:order-none lg:col-span-3 lg:col-start-1 lg:row-start-1">
              <CaseProfile
                customerId="C02177"
                month={5}
                badge="High priority"
                subtitle="Unusual cash activity"
                delay={0.1}
                annotation="this one escalated fast"
                story={
                  <>
                    C02177 recorded €102,993.61 in May 2026 against an
                    expected €4,605.19 profile. Ten cash deposits, totalling
                    roughly €90.1k, landed across a four-day window at both
                    ATM and branch channels, and funds moved on to 40 unique
                    receivers.
                  </>
                }
              />
            </div>

            {/* CENTER — main evidence: deviation from expected */}
            <motion.div
              variants={fadeUpVariant(0.2)}
              className="order-2 lg:order-none lg:col-span-5 lg:col-start-4 lg:row-start-1"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                Evidence B · Deviation from expected
              </p>

              <p className="text-burgundy mt-3 font-mono text-[2.6rem] leading-none font-bold sm:text-6xl lg:text-7xl">
                <AnimatedNumber
                  value={22.36}
                  active={sectionInView}
                  formatter={ratioFmt}
                  delay={0.35}
                  duration={1.4}
                />
              </p>

              <p className="font-hand text-burgundy/70 mt-3 -rotate-2 text-lg leading-none">
                cash deposits ≈ 87.5% of monthly volume
              </p>

              <div className="mt-8 space-y-3">
                <div>
                  <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                    <span>Expected</span>
                    <span>€4.6k</span>
                  </div>
                  <div className="relative mt-1.5 h-[6px] bg-black/[0.06]">
                    <motion.div
                      variants={barVariant(0.5)}
                      style={{ width: "4.5%", transformOrigin: "left" }}
                      className="h-full bg-black/25"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-burgundy/70 flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase">
                    <span>Actual</span>
                    <span>€103.0k</span>
                  </div>
                  <div className="relative mt-1.5 h-[6px] bg-black/[0.06]">
                    <motion.div
                      variants={barVariant(0.62)}
                      style={{ width: "100%", transformOrigin: "left" }}
                      className="bg-burgundy h-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — behavioural metrics */}
            <div className="order-3 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <EvidenceMetric
                tag="Evidence A"
                label="Cash deposits"
                note="concentrated in four days"
                delay={0.3}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                      Count
                    </p>
                    <p className="text-ink mt-1 font-mono text-2xl font-bold">
                      <AnimatedNumber
                        value={10}
                        active={sectionInView}
                        formatter={(v) => Math.round(v).toString()}
                        delay={0.4}
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-burgundy/70 font-mono text-[10px] tracking-[0.16em] uppercase">
                      Total
                    </p>
                    <p className="text-burgundy mt-1 font-mono text-lg font-bold">
                      <AnimatedNumber
                        value={90123.97}
                        active={sectionInView}
                        formatter={currencyFmt}
                        delay={0.5}
                      />
                    </p>
                  </div>
                </div>
              </EvidenceMetric>

              <EvidenceMetric
                tag="Evidence C"
                label="Unique receivers"
                note="funds moved on to 40 destinations"
                delay={0.55}
              >
                <p className="text-ink font-mono text-3xl font-bold">
                  <AnimatedNumber
                    value={40}
                    active={sectionInView}
                    formatter={(v) => Math.round(v).toString()}
                    delay={0.65}
                  />
                </p>
              </EvidenceMetric>
            </div>

            {/* CENTER (row 2) — cash deposit timeline */}
            <div className="order-4 lg:order-none lg:col-span-5 lg:col-start-4 lg:row-start-2">
              <CashDepositTimeline deposits={DEPOSITS} delay={0.75} />
            </div>

            {/* RIGHT (row 2) — triggered rules */}
            <div className="order-5 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-2">
              <TriggeredRules rules={TRIGGERED_RULES} delay={0.9} />
            </div>
          </div>

          {/* investigator observations */}
          <motion.div
            variants={fadeUpVariant(1.0)}
            className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-16 max-w-2xl px-6 py-5"
          >
            <p className="text-burgundy/70 mb-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
              Investigator observations
            </p>
            <ul className="space-y-2">
              {OBSERVATIONS.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-[13px] leading-[1.7] text-black/65"
                >
                  <span aria-hidden="true" className="text-burgundy/60 mt-[2px]">
                    •
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* investigation assessment */}
          <motion.div
            variants={fadeUpVariant(1.15)}
            className="mt-14 border-t-2 border-burgundy/30 pt-8"
          >
            <p className="text-burgundy font-mono text-[10px] font-bold tracking-[0.24em] uppercase">
              Investigation assessment
            </p>
            <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug italic sm:text-3xl">
              &ldquo;Behaviour materially deviates from the customer baseline
              and demonstrates multiple monitoring indicators. The case would
              warrant enhanced review and additional source-of-funds/context
              checks.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
