"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import RuleBar from "./RuleBar";
import EvidenceCounter from "./EvidenceCounter";
import InsightCallout from "./InsightCallout";
import InvestigationAnnotation from "./InvestigationAnnotation";
import PinnedNote from "./PinnedNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const RULES: {
  id: string;
  name: string;
  count: number;
  caption: string;
  annotation?: string;
}[] = [
  {
    id: "R01",
    name: "HIGH_MONTHLY_VOLUME",
    count: 723,
    caption: "monthly activity far above customer profile",
  },
  {
    id: "R02",
    name: "LARGE_SINGLE_TXN",
    count: 723,
    caption: "single transaction unusually large relative to expected activity",
  },
  {
    id: "R03",
    name: "CROSS_BORDER_SPIKE",
    count: 561,
    caption: "cross-border behaviour changed sharply versus personal history",
    annotation: "behavioural signal",
  },
];

const MAX_COUNT = 723;
const TOTAL_ALERTS = 2007;
const UNIQUE_CASES = 1366;

function AnimatedInline({
  value,
  active,
  delay = 0,
}: {
  value: number;
  active: boolean;
  delay?: number;
}) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, value, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, motionValue, value, delay]);

  return <motion.span className="text-ink font-mono font-semibold">{rounded}</motion.span>;
}

export default function AlertDistribution() {
  const [numbersInView, setNumbersInView] = useState(false);

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
            Alert Distribution
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            What the system caught
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            Three monitoring rules generated 2,007 alerts before consolidation
            into customer-month investigation cases.
          </p>
        </Reveal>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14">
          <div className="lg:col-span-8">
            <div>
              {RULES.map((rule, i) => (
                <div key={rule.id} className="relative">
                  <RuleBar
                    id={rule.id}
                    name={rule.name}
                    count={rule.count}
                    max={MAX_COUNT}
                    caption={rule.caption}
                    delay={i * 0.16}
                  />

                  {rule.annotation && (
                    <InvestigationAnnotation
                      className="mt-3 ml-1"
                      rotate={-3}
                      delay={i * 0.16 + 0.7}
                    >
                      {rule.annotation}
                    </InvestigationAnnotation>
                  )}
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              onViewportEnter={() => setNumbersInView(true)}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 max-w-lg text-sm leading-7 text-black/55"
            >
              <AnimatedInline value={TOTAL_ALERTS} active={numbersInView} delay={0.9} /> rule
              triggers were consolidated into{" "}
              <AnimatedInline value={UNIQUE_CASES} active={numbersInView} delay={1.05} />{" "}
              investigation cases.
            </motion.p>
          </div>

          <div className="mt-16 flex flex-col items-start gap-10 lg:col-span-4 lg:mt-0 lg:items-end">
            <div className="flex gap-5">
              <EvidenceCounter
                label="Raw alert volume"
                value={TOTAL_ALERTS}
                rotate={-3}
                delay={0.3}
              />
              <EvidenceCounter
                label="Unique cases"
                value={UNIQUE_CASES}
                rotate={2}
                delay={0.44}
                emphasized
              />
            </div>

            <div className="lg:mr-2">
              <PinnedNote variant="mini" rotate={-2}>
                <span className="font-hand text-ink/80 text-base leading-tight">
                  same system, different behaviours
                </span>
              </PinnedNote>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-black/10 pt-14">
          <InsightCallout delay={0.1}>
            More alerts did not automatically mean more risk.
          </InsightCallout>
        </div>
      </div>
    </section>
  );
}
