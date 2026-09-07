"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import CaseTab from "./CaseTab";
import CaseProfile from "./CaseProfile";
import EvidenceMetric from "./EvidenceMetric";
import TransactionTimeline, { type TimelineTx } from "./TransactionTimeline";
import TriggeredRules from "./TriggeredRules";
import CaseNote from "./CaseNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const currencyFmt = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ratioFmt = (v: number) => `${v.toFixed(2)}×`;
const percent0Fmt = (v: number) => `${Math.round(v)}%`;
const percent1Fmt = (v: number) => `${v.toFixed(1)}%`;
const ppFmt = (v: number) => `+${v.toFixed(1)} pp`;

const TRANSACTIONS: TimelineTx[] = [
  {
    date: "05 JUN",
    fullDate: "05 Jun 2026",
    amount: "€3,405.80",
    type: "cash deposit",
    typeRaw: "CASH_DEPOSIT",
    channel: "ATM",
    route: "RO → PL",
    receiver: "C01553",
  },
  {
    date: "07 JUN",
    fullDate: "07 Jun 2026",
    amount: "€14,833.44",
    type: "wire",
    typeRaw: "WIRE",
    channel: "BRANCH",
    route: "RO → PL",
    receiver: "C01080",
    dominant: true,
  },
];

const TRIGGERED_RULES = ["HIGH_MONTHLY_VOLUME", "LARGE_SINGLE_TXN", "CROSS_BORDER_SPIKE"];

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
  const [highlighted, setHighlighted] = useState<"A" | "B" | "C" | null>(null);

  function handleTxHighlight(index: number, hovering: boolean) {
    const key = index === 1 ? "B" : "A";
    setHighlighted((current) => {
      if (hovering) return key;
      return current === key ? null : current;
    });
  }

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
            Investigation Exhibit
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
              Investigation File / C01983 / Month 06
            </CaseTab>
          </motion.div>

          <div className="mt-10 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-16">
            {/* LEFT — case profile */}
            <div className="order-1 lg:order-none lg:col-span-3 lg:col-start-1 lg:row-start-1">
              <CaseProfile
                customerId="C01983"
                month={6}
                delay={0.1}
                annotation="this one looked off"
                story={
                  <>
                    C01983 recorded €18.2k in monthly activity against an
                    expected €3.3k profile. One €14.8k wire accounted for most
                    of the month&apos;s volume, while cross-border activity
                    increased from a historical average of 54.6% to 100%.
                  </>
                }
              />
            </div>

            {/* CENTER — main evidence transaction */}
            <motion.div
              variants={fadeUpVariant(0.2)}
              className="order-2 lg:order-none lg:col-span-5 lg:col-start-4 lg:row-start-1"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                Evidence B · Largest transaction
              </p>

              <p className="text-burgundy mt-3 font-mono text-[2.6rem] leading-none font-bold sm:text-6xl lg:text-7xl">
                <AnimatedNumber
                  value={14833.44}
                  active={sectionInView}
                  formatter={currencyFmt}
                  delay={0.35}
                  duration={1.4}
                />
              </p>

              <p className="font-hand text-burgundy/70 mt-3 -rotate-2 text-lg leading-none">
                81% of monthly volume
              </p>

              <div className="mt-8 space-y-3">
                <div>
                  <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                    <span>Expected</span>
                    <span>€3.3k</span>
                  </div>
                  <div className="relative mt-1.5 h-[6px] bg-black/[0.06]">
                    <motion.div
                      variants={barVariant(0.5)}
                      style={{ width: "18.1%", transformOrigin: "left" }}
                      className="h-full bg-black/25"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-burgundy/70 flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase">
                    <span>Actual</span>
                    <span>€18.2k</span>
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
                label="Monthly volume"
                note="actual vs expected behaviour"
                highlighted={highlighted === "A"}
                delay={0.3}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                      Expected
                    </p>
                    <p className="mt-1 font-mono text-lg text-black/60">
                      <AnimatedNumber
                        value={3308.68}
                        active={sectionInView}
                        formatter={currencyFmt}
                        delay={0.4}
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-burgundy/70 font-mono text-[10px] tracking-[0.16em] uppercase">
                      Actual
                    </p>
                    <p className="text-ink mt-1 font-mono text-lg font-bold">
                      <AnimatedNumber
                        value={18239.24}
                        active={sectionInView}
                        formatter={currencyFmt}
                        delay={0.5}
                      />
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-burgundy font-mono text-2xl font-bold">
                    <AnimatedNumber
                      value={5.51}
                      active={sectionInView}
                      formatter={ratioFmt}
                      delay={0.6}
                    />
                  </span>
                  <span className="text-xs text-black/50">expected activity</span>
                </div>
              </EvidenceMetric>

              <EvidenceMetric
                tag="Evidence B"
                label="Largest transaction"
                note="one wire, most of the month"
                highlighted={highlighted === "B"}
                delay={0.45}
              >
                <p className="text-ink font-mono text-2xl font-bold">
                  <AnimatedNumber
                    value={14833.44}
                    active={sectionInView}
                    formatter={currencyFmt}
                    delay={0.55}
                  />
                </p>
                <p className="mt-2 font-mono text-sm text-black/55">
                  <AnimatedNumber
                    value={4.48}
                    active={sectionInView}
                    formatter={ratioFmt}
                    delay={0.65}
                  />{" "}
                  expected activity
                </p>
              </EvidenceMetric>

              <EvidenceMetric
                tag="Evidence C"
                label="Cross-border shift"
                note="compared to their own history"
                highlighted={highlighted === "C"}
                delay={0.6}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                      Historical avg
                    </p>
                    <p className="mt-1 font-mono text-lg text-black/60">
                      <AnimatedNumber
                        value={54.6}
                        active={sectionInView}
                        formatter={percent1Fmt}
                        delay={0.7}
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-burgundy/70 font-mono text-[10px] tracking-[0.16em] uppercase">
                      This month
                    </p>
                    <p className="text-burgundy mt-1 font-mono text-2xl font-bold">
                      <AnimatedNumber
                        value={100}
                        active={sectionInView}
                        formatter={percent0Fmt}
                        delay={0.8}
                      />
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-mono text-xs text-black/50">
                  <AnimatedNumber
                    value={45.4}
                    active={sectionInView}
                    formatter={ppFmt}
                    delay={0.9}
                  />{" "}
                  change
                </p>
              </EvidenceMetric>
            </div>

            {/* CENTER (row 2) — transaction timeline */}
            <div className="order-4 lg:order-none lg:col-span-5 lg:col-start-4 lg:row-start-2">
              <TransactionTimeline
                transactions={TRANSACTIONS}
                onHighlight={handleTxHighlight}
                delay={0.75}
              />
            </div>

            {/* RIGHT (row 2) — triggered rules */}
            <div className="order-5 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-2">
              <TriggeredRules rules={TRIGGERED_RULES} delay={0.9} />
            </div>
          </div>

          <CaseNote delay={1.3} className="mt-16">
            Three rules fired, but the alert does not prove money laundering.
            It identifies behaviour that warrants investigation.
          </CaseNote>
        </motion.div>
      </div>
    </section>
  );
}
