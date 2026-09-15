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

const ACTIVITY_NOTES = [
  "Activity occurred through both ATM and branch channels.",
  "Deposits were concentrated across a short four-day period.",
  "Funds moved onward to 40 unique receivers.",
];

function StageTag({ children }: { children: string }) {
  return (
    <p className="text-burgundy font-mono text-[11px] font-bold tracking-[0.26em] uppercase">
      {children}
    </p>
  );
}

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
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, formatter);

  useEffect(() => {
    if (!active) return;
    motionValue.set(0);
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

          <div className="mt-10 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14">
            {/* SUBJECT — persistent case profile */}
            <div className="order-1 lg:order-none lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <motion.div variants={fadeUpVariant(0.05, 10)}>
                <StageTag>Subject</StageTag>
              </motion.div>

              <CaseProfile
                className="mt-4"
                customerId="C02177"
                month={5}
                badge="High priority"
                subtitle="Unusual cash activity"
                delay={0.1}
                story={
                  <dl className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                        Customer
                      </dt>
                      <dd className="text-ink font-mono text-sm font-semibold">
                        C02177
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                        Occupation
                      </dt>
                      <dd className="text-ink font-mono text-sm font-semibold">
                        Self-employed
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                        Expected monthly volume
                      </dt>
                      <dd className="text-ink font-mono text-sm font-semibold">
                        €4,605.19
                      </dd>
                    </div>
                  </dl>
                }
              />
            </div>

            {/* TRIGGER → ACTIVITY → INTERPRETATION → CONCLUSION */}
            <div className="order-2 lg:order-none lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:border-l lg:border-black/10 lg:pl-14">
              {/* TRIGGER */}
              <motion.div variants={fadeUpVariant(0.15, 10)}>
                <StageTag>Trigger</StageTag>
              </motion.div>

              <motion.p
                variants={fadeUpVariant(0.2)}
                className="mt-4 max-w-lg text-[15px] leading-[1.75] text-black/65"
              >
                In May 2026, C02177&apos;s account activity reached{" "}
                <span className="text-ink font-semibold">€102,993.61</span> —
                a deviation of{" "}
                <span className="text-burgundy font-semibold">22.36×</span>{" "}
                the customer&apos;s expected monthly volume.
              </motion.p>

              <motion.div variants={fadeUpVariant(0.25)}>
                <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                  Evidence B · Volume vs. expected profile
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

                <div className="mt-8 max-w-md space-y-3">
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

                <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-lg leading-none">
                  this one escalated fast
                </p>
              </motion.div>

              {/* ACTIVITY */}
              <motion.div
                variants={fadeUpVariant(0.4, 10)}
                className="mt-14 border-t border-black/10 pt-10"
              >
                <StageTag>Activity</StageTag>
              </motion.div>

              <div className="mt-2 max-w-md">
                <EvidenceMetric
                  tag="Evidence A"
                  label="Cash deposits"
                  note="≈ 87.5% of monthly volume"
                  delay={0.45}
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
                          delay={0.5}
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
                          delay={0.6}
                        />
                      </p>
                    </div>
                  </div>
                </EvidenceMetric>

                <EvidenceMetric
                  tag="Evidence C"
                  label="Unique receivers"
                  note="across the wider observed activity"
                  delay={0.7}
                >
                  <p className="text-ink font-mono text-3xl font-bold">
                    <AnimatedNumber
                      value={40}
                      active={sectionInView}
                      formatter={(v) => Math.round(v).toString()}
                      delay={0.75}
                    />
                  </p>
                </EvidenceMetric>
              </div>

              <motion.ul
                variants={fadeUpVariant(0.85)}
                className="mt-6 max-w-md space-y-2"
              >
                {ACTIVITY_NOTES.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-[13px] leading-[1.7] text-black/60"
                  >
                    <span aria-hidden="true" className="text-burgundy/60 mt-[2px]">
                      •
                    </span>
                    {line}
                  </li>
                ))}
              </motion.ul>

              {/* INVESTIGATIVE INTERPRETATION */}
              <motion.div
                variants={fadeUpVariant(0.95, 10)}
                className="mt-14 border-t border-black/10 pt-10"
              >
                <StageTag>Investigative interpretation</StageTag>
              </motion.div>

              <motion.p
                variants={fadeUpVariant(1.0)}
                className="mt-4 max-w-lg text-[15px] leading-[1.75] text-black/65"
              >
                The scale of the deviation from C02177&apos;s expected profile
                represents a severe departure from the customer&apos;s
                established baseline. The concentration of large cash
                deposits across a short window, combined with dispersal to a
                broad base of receivers, is behaviour consistent with
                structuring indicators.
              </motion.p>

              <motion.div
                variants={fadeUpVariant(1.1)}
                className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-6 max-w-lg px-6 py-5"
              >
                <p className="text-[15px] leading-[1.7] text-black/70 italic">
                  &ldquo;These indicators justify enhanced review but do not
                  establish money laundering.&rdquo;
                </p>
              </motion.div>

              {/* ANALYST CONCLUSION */}
              <motion.div
                variants={fadeUpVariant(1.2, 10)}
                className="mt-14 max-w-lg border-t-2 border-burgundy/30 pt-8"
              >
                <p className="text-burgundy font-mono text-[10px] font-bold tracking-[0.24em] uppercase">
                  Analyst conclusion
                </p>
                <p className="mt-4 font-serif text-2xl leading-snug italic sm:text-3xl">
                  &ldquo;Behaviour materially deviates from the customer
                  baseline and demonstrates multiple monitoring indicators.
                  The case would warrant enhanced review and additional
                  source-of-funds/context checks.&rdquo;
                </p>
              </motion.div>
            </div>
          </div>

          {/* SUPPORTING EVIDENCE — full deposit log and triggered rules */}
          <motion.div
            variants={fadeUpVariant(1.35)}
            className="mt-16 border-t border-black/10 pt-12"
          >
            <p className="font-mono text-[10px] font-bold tracking-[0.24em] text-black/40 uppercase">
              Supporting evidence
            </p>
            <p className="mt-2 max-w-md text-sm text-black/55">
              Full cash deposit log and rule triggers behind this assessment.
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-7">
                <CashDepositTimeline deposits={DEPOSITS} delay={0.1} />
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <TriggeredRules rules={TRIGGERED_RULES} delay={0.2} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
