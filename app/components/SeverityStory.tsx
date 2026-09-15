"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import CaseTab from "./CaseTab";
import CaseNote from "./CaseNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const currencyFmt = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ratioFmt = (v: number) => `${v.toFixed(2)}×`;
const percentFmt = (v: number) => `${v.toFixed(1)}%`;

const METRICS: {
  label: string;
  value: number;
  formatter: (v: number) => string;
}[] = [
  { label: "Expected monthly volume", value: 4788.75, formatter: currencyFmt },
  { label: "January 2026 volume", value: 161166.22, formatter: currencyFmt },
  { label: "Volume vs expected", value: 33.66, formatter: ratioFmt },
  { label: "Largest transaction", value: 158574.12, formatter: currencyFmt },
  { label: "Largest transaction vs expected", value: 33.11, formatter: ratioFmt },
  { label: "Largest transaction share of monthly volume", value: 98.4, formatter: percentFmt },
];

function AnimatedStat({
  value,
  active,
  delay,
  formatter,
}: {
  value: number;
  active: boolean;
  delay: number;
  formatter: (v: number) => string;
}) {
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, formatter);

  useEffect(() => {
    if (!active) return;
    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 1.2,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, motionValue, value, delay]);

  return <motion.span className="text-ink font-mono text-2xl font-bold sm:text-3xl">{display}</motion.span>;
}

export default function SeverityStory() {
  const [inView, setInView] = useState(false);

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
            Investigation Exhibit / Contrast Case
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Second Investigation
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setInView(true)}
          variants={{ hidden: {}, show: {} }}
          className="mt-10"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <CaseTab tone="manila" onLoad>
              Investigation File / C00046 / Month 01
            </CaseTab>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mt-8 flex flex-wrap items-baseline gap-4"
          >
            <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
              Case #C00046
            </h3>
            <span className="border-burgundy/50 text-burgundy/80 rounded-sm border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
              Single Transaction Dominance
            </span>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-black/10 border-t border-l border-black/10 sm:grid-cols-3 sm:divide-y-0">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="border-r border-b border-black/10 p-5 sm:p-6"
              >
                <AnimatedStat
                  value={m.value}
                  active={inView}
                  delay={0.2 + i * 0.08}
                  formatter={m.formatter}
                />
                <p className="mt-1 max-w-[16ch] text-xs tracking-[0.02em] text-black/50 uppercase">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>

          <CaseNote delay={0.9} className="mt-14">
            This case produced an extreme monthly-volume alert, but unlike
            C02177, nearly all activity was driven by one transaction. This
            distinction demonstrates why rule outputs require investigation
            rather than automatic classification.
          </CaseNote>
        </motion.div>
      </div>
    </section>
  );
}
