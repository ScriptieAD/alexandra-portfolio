"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import CaseTab from "./CaseTab";
import TriggeredRules from "./TriggeredRules";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ratioFmt = (v: number) => `${v.toFixed(2)}×`;

const TRIGGERED_RULES = ["HIGH_MONTHLY_VOLUME", "LARGE_SINGLE_TXN"];

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

function AnimatedRatio({
  value,
  active,
  delay = 0,
  duration = 1.1,
  className = "",
}: {
  value: number;
  active: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, ratioFmt);

  useEffect(() => {
    if (!active) return;
    motionValue.set(0);
    const controls = animate(motionValue, value, { duration, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [active, motionValue, value, delay, duration]);

  return <motion.span className={className}>{display}</motion.span>;
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
              Investigation File / C01222 / May 2026
            </CaseTab>
          </motion.div>

          <motion.div
            variants={fadeUpVariant(0.05, 10)}
            className="mt-6 flex flex-wrap items-baseline gap-4"
          >
            <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
              Case #C01222
            </h3>
            <span className="border-burgundy text-burgundy rounded-sm border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              Critical
            </span>
          </motion.div>

          <div className="mt-12 max-w-2xl">
            {/* PROFILE DEVIATION */}
            <motion.div variants={fadeUpVariant(0.15, 10)}>
              <StageTag>Profile Deviation</StageTag>
            </motion.div>

            <motion.p
              variants={fadeUpVariant(0.2)}
              className="mt-4 text-[15px] leading-[1.75] text-black/65"
            >
              C01222 processed{" "}
              <span className="text-ink font-semibold">€131,303.18</span> in
              May 2026 against an expected monthly volume of just{" "}
              <span className="text-ink font-semibold">€1,906.46</span>.
            </motion.p>

            <motion.div variants={fadeUpVariant(0.28)} className="mt-8 max-w-md space-y-3">
              <div>
                <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                  <span>Expected monthly volume</span>
                  <span>€1.9K</span>
                </div>
                <div className="relative mt-1.5 h-[6px] bg-black/[0.06]">
                  <motion.div
                    variants={barVariant(0.5)}
                    style={{ width: "1.5%", transformOrigin: "left" }}
                    className="h-full bg-black/25"
                  />
                </div>
              </div>

              <div>
                <div className="text-burgundy/70 flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase">
                  <span>May 2026 volume</span>
                  <span>€131.3K</span>
                </div>
                <div className="relative mt-1.5 h-[6px] bg-black/[0.06]">
                  <motion.div
                    variants={barVariant(0.62)}
                    style={{ width: "100%", transformOrigin: "left" }}
                    className="bg-burgundy h-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant(0.4)} className="mt-8">
              <AnimatedRatio
                value={68.87}
                active={sectionInView}
                delay={0.1}
                duration={1.4}
                className="text-burgundy font-mono text-[2.6rem] leading-none font-bold sm:text-6xl lg:text-7xl"
              />
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                Expected monthly activity
              </p>
            </motion.div>

            {/* TRANSACTION CONCENTRATION */}
            <motion.div
              variants={fadeUpVariant(0.5, 10)}
              className="mt-14 border-t border-black/10 pt-10"
            >
              <StageTag>Transaction Concentration</StageTag>
            </motion.div>

            <motion.p
              variants={fadeUpVariant(0.55)}
              className="mt-4 text-[15px] leading-[1.75] text-black/65"
            >
              A single transaction of{" "}
              <span className="text-ink font-semibold">€128,755.50</span>{" "}
              accounted for most of the observed volume on its own.
            </motion.p>

            <motion.div variants={fadeUpVariant(0.62)} className="mt-6 flex flex-wrap gap-10">
              <div>
                <p className="text-ink font-mono text-2xl font-bold sm:text-3xl">€128.8K</p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                  Largest transaction
                </p>
              </div>
              <div>
                <AnimatedRatio
                  value={67.54}
                  active={sectionInView}
                  delay={0.1}
                  className="text-burgundy font-mono text-2xl font-bold sm:text-3xl"
                />
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
                  Expected monthly volume
                </p>
              </div>
            </motion.div>

            {/* RISK ASSESSMENT */}
            <motion.div
              variants={fadeUpVariant(0.72, 10)}
              className="mt-14 border-t border-black/10 pt-10"
            >
              <StageTag>Risk Assessment</StageTag>
            </motion.div>

            <motion.dl variants={fadeUpVariant(0.78)} className="mt-4 max-w-sm space-y-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                  Behavioural rules triggered
                </dt>
                <dd className="text-ink font-mono text-sm font-semibold">2</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                  Maximum threshold exceedance
                </dt>
                <dd className="text-ink font-mono text-sm font-semibold">26.20×</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                  Priority
                </dt>
                <dd className="text-burgundy font-mono text-sm font-bold">Critical</dd>
              </div>
            </motion.dl>

            <motion.div variants={fadeUpVariant(0.84)}>
              <TriggeredRules rules={TRIGGERED_RULES} delay={0.1} className="mt-6" />
            </motion.div>

            {/* ANALYST INTERPRETATION */}
            <motion.div
              variants={fadeUpVariant(0.95, 10)}
              className="mt-14 border-t-2 border-burgundy/30 pt-8"
            >
              <p className="text-burgundy font-mono text-[10px] font-bold tracking-[0.24em] uppercase">
                Analyst Interpretation
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-black/65">
                C01222 displayed an extreme deviation from its expected
                monthly activity. The account processed €131.3K during May
                against an expected monthly volume of approximately €1.9K,
                with a single €128.8K transaction accounting for most of the
                observed volume. The combination of extreme profile
                deviation and transaction concentration justified
                critical-priority review.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant(1.05)}
              className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-6 px-6 py-5"
            >
              <p className="text-[15px] leading-[1.7] text-black/70 italic">
                &ldquo;These indicators identify unusual behaviour and
                prioritise the case for investigation; they do not
                independently establish money laundering.&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
