"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function fadeVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function barVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1, delay, ease: [0.65, 0, 0.35, 1] as const },
    },
  };
}

export default function RuleBar({
  id,
  name,
  count,
  max,
  caption,
  delay = 0,
  className = "",
}: {
  id: string;
  name: string;
  count: number;
  max: number;
  caption: string;
  delay?: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const motionCount = useMotionValue(0);
  const rounded = useTransform(motionCount, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionCount, count, {
      duration: 1.1,
      delay: delay + 0.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionCount, count, delay]);

  const pct = Math.min(100, (count / max) * 100);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      variants={rowVariants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${name.replace(/_/g, " ")}: ${count} alerts`}
      className={`group relative border-t border-black/10 py-5 first:border-t-0 focus:outline-none sm:py-6 ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <motion.div variants={fadeVariant(delay + 0.05)} className="flex items-baseline gap-3">
          <span className="text-burgundy/60 font-mono text-[10px] tracking-[0.14em]">{id}</span>
          <span className="text-ink font-mono text-sm font-bold tracking-tight transition-colors duration-300 group-hover:text-burgundy sm:text-base">
            {name}
          </span>
        </motion.div>

        <motion.span
          variants={fadeVariant(delay + 0.15)}
          className="text-ink font-mono text-lg font-bold sm:text-xl"
        >
          {rounded}
        </motion.span>
      </div>

      <div className="relative mt-3 h-[10px] w-full bg-black/[0.05]">
        <motion.div
          variants={barVariant(delay + 0.1)}
          style={{ width: `${pct}%`, transformOrigin: "left" }}
          className="bg-burgundy relative h-full rounded-r-[3px] transition-[filter] duration-300 group-hover:brightness-110"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1.5px, transparent 1.5px, transparent 6px)",
            }}
          />
        </motion.div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          hovered ? "mt-2.5 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-md text-xs leading-relaxed text-black/55 italic">{caption}</p>

            <span
              aria-hidden="true"
              className="border-burgundy/40 text-burgundy/70 shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase"
            >
              Rule trigger → alert
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
