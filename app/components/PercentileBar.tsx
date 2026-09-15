"use client";

import { motion } from "motion/react";

const TICKS = [0, 25, 50, 75, 95];

function fillVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] as const },
    },
  };
}

function markVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function PercentileBar({
  markerLabel = "95th percentile",
  caption = "both thresholds sit here",
  delay = 0,
  className = "",
}: {
  markerLabel?: string;
  caption?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Observed behavioural ratios
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Distribution
        </p>
      </div>

      <div className="relative mx-1 mt-10 h-16">
        <div className="bg-black/[0.06] absolute top-8 right-0 left-0 h-2" />

        <motion.div
          variants={fillVariant(delay)}
          style={{ width: "95%", transformOrigin: "left" }}
          className="bg-black/15 absolute top-8 left-0 h-2"
        />

        <motion.div
          variants={fillVariant(delay + 0.1)}
          style={{ width: "5%", left: "95%", transformOrigin: "left" }}
          className="bg-burgundy absolute top-8 h-2"
        />

        {TICKS.map((t, i) => {
          const emphasized = t === 95;
          const align = t === 0 ? "left" : t === 100 ? "right" : "center";
          return (
            <motion.div
              key={t}
              variants={markVariant(delay + 0.3 + i * 0.08)}
              style={
                align === "right"
                  ? { right: 0 }
                  : { left: `${t}%` }
              }
              className="absolute top-0"
            >
              <span
                aria-hidden="true"
                className={`block h-3 w-px ${emphasized ? "bg-burgundy" : "bg-black/30"} ${
                  align === "left" ? "" : align === "right" ? "ml-auto" : "mx-auto"
                }`}
              />
              <span
                className={`mt-2 block font-mono whitespace-nowrap ${
                  align === "left" ? "" : align === "right" ? "text-right" : "-translate-x-1/2"
                } ${emphasized ? "text-burgundy text-xs font-bold" : "text-[11px] text-black/45"}`}
              >
                {t}
                {emphasized ? "" : "th"}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        variants={markVariant(delay + 0.9)}
        className="font-hand text-burgundy/70 mt-4 -rotate-1 text-base leading-none"
      >
        {markerLabel} — {caption}
      </motion.p>
    </motion.div>
  );
}
