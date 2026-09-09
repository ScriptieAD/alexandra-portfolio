"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Reveal from "./Reveal";
import InsightCallout from "./InsightCallout";
import PercentileBar from "./PercentileBar";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ratioFmt = (v: number) => `${v.toFixed(2)}×`;

function AnimatedRatio({
  value,
  active,
  delay = 0,
}: {
  value: number;
  active: boolean;
  delay?: number;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, ratioFmt);

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, value, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, motionValue, value, delay]);

  return <motion.span>{display}</motion.span>;
}

export default function ThresholdCalibration() {
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
            Threshold Calibration
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Thresholds, derived from the data
          </h2>
          <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-xl leading-none">
            not guessed. measured.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
            Rather than picking round numbers by intuition, both detection
            thresholds were set from the empirical distribution of observed
            customer-month behaviour.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setInView(true)}
          variants={{ hidden: {}, show: {} }}
          className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-14"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="border-t border-black/10 pt-7"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
              HIGH_MONTHLY_VOLUME threshold
            </p>
            <p className="text-burgundy mt-2 font-mono text-6xl leading-none font-bold sm:text-7xl">
              <AnimatedRatio value={3.82} active={inView} delay={0.15} />
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="border-t border-black/10 pt-7"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
              LARGE_SINGLE_TXN threshold
            </p>
            <p className="text-ink mt-2 font-mono text-6xl leading-none font-bold sm:text-7xl">
              <AnimatedRatio value={2.58} active={inView} delay={0.3} />
            </p>
          </motion.div>
        </motion.div>

        <Reveal delay={0.1} className="mt-10">
          <p className="max-w-xl text-sm leading-7 text-black/55">
            Both thresholds were set at the 95th percentile of observed
            behavioural ratios.
          </p>
        </Reveal>

        <PercentileBar delay={0.1} className="mt-16 max-w-2xl" />

        <InsightCallout delay={0.1} className="mt-16 max-w-3xl">
          Detection quality is a trade-off, not a single number.
        </InsightCallout>
      </div>
    </section>
  );
}
