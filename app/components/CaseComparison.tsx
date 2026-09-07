"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import ConfidentialStamp from "./ConfidentialStamp";

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

const ratioFmt = (v: number) => `${v.toFixed(2)}×`;

function AnimatedRatio({
  value,
  active,
  delay = 0,
  duration = 1.2,
}: {
  value: number;
  active: boolean;
  delay?: number;
  duration?: number;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, ratioFmt);

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, value, { duration, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [active, motionValue, value, delay, duration]);

  return <motion.span>{display}</motion.span>;
}

export default function CaseComparison({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      variants={{ hidden: {}, show: {} }}
      className={`grid gap-8 sm:grid-cols-2 sm:gap-10 ${className}`}
    >
      {/* LEFT — conceptual, visually weaker */}
      <motion.div variants={fadeUpVariant(delay)} className="border border-black/10 p-7 sm:p-8">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/35 uppercase">
          More rules
        </p>
        <h3 className="mt-3 font-serif text-2xl text-black/70">3 Rule Case</h3>
        <p className="mt-1 font-mono text-xs text-black/40 uppercase tracking-[0.14em]">
          Illustrative example
        </p>

        <div className="mt-6 border-t border-black/10 pt-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/35 uppercase">
            Triggered rules
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold text-black/55">3</p>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-black/45">
            Three weak signals fire, but none exceed their threshold by a
            meaningful margin.
          </p>
        </div>

        <p className="mt-6 font-mono text-xs tracking-[0.14em] text-black/40 uppercase">
          Priority <span className="text-black/60">· Low–Medium</span>
        </p>
      </motion.div>

      {/* RIGHT — C00280, visually stronger */}
      <motion.div
        variants={fadeUpVariant(delay + 0.15)}
        className="bg-paper-card shadow-paper-md border-burgundy/30 relative border p-7 sm:p-9"
      >
        <div className="absolute -top-3.5 right-6 z-10">
          <ConfidentialStamp label="Critical" sublabel="Priority" rotate={6} onLoad />
        </div>

        <p className="text-burgundy font-mono text-[10px] tracking-[0.2em] uppercase">
          More severe
        </p>
        <h3 className="mt-3 font-serif text-3xl">Case C00280</h3>
        <p className="mt-1 font-mono text-xs text-black/40 uppercase tracking-[0.14em]">
          Month 05
        </p>

        <div className="mt-6 border-t border-black/10 pt-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Triggered rules
          </p>
          <p className="text-ink mt-1 font-mono text-3xl font-bold">2</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-sm border border-black/15 px-2 py-1 font-mono text-[10px] text-black/60">
              HIGH_MONTHLY_VOLUME
            </span>
            <span className="rounded-sm border border-black/15 px-2 py-1 font-mono text-[10px] text-black/60">
              LARGE_SINGLE_TXN
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-black/10 pt-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Max threshold ratio
          </p>
          <p className="text-burgundy mt-1 font-mono text-5xl leading-none font-bold">
            <AnimatedRatio value={32.46} active={inView} delay={delay + 0.35} duration={1.4} />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
