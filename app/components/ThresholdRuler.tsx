"use client";

import { motion } from "motion/react";

type RulerMark = { value: number; label: string; emphasized?: boolean };

const MARKS: RulerMark[] = [
  { value: 1, label: "1×" },
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 5, label: "5×" },
  { value: 10, label: "10×" },
  { value: 32.46, label: "32.46×", emphasized: true },
];

function toPct(value: number, max: number) {
  return (Math.log10(value) / Math.log10(max)) * 100;
}

function fillVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.3, delay, ease: [0.65, 0, 0.35, 1] as const },
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

export default function ThresholdRuler({
  max = 32.46,
  delay = 0,
  className = "",
}: {
  max?: number;
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
          Max_threshold_ratio
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Evidence ruler
        </p>
      </div>

      <div className="relative mx-8 mt-10 h-16 sm:mx-10">
        <div className="bg-black/15 absolute top-8 right-0 left-0 h-px" />

        <motion.div
          variants={fillVariant(delay)}
          style={{ transformOrigin: "left" }}
          className="bg-burgundy absolute top-8 left-0 h-px w-full"
        />

        {MARKS.map((mark, i) => {
          const left = toPct(mark.value, max);
          const align = i === 0 ? "left" : i === MARKS.length - 1 ? "right" : "center";

          return (
            <motion.div
              key={mark.label}
              variants={markVariant(delay + 0.3 + i * 0.08)}
              style={{ left: `${left}%` }}
              className="absolute top-0"
            >
              <span
                aria-hidden="true"
                className={`block h-3 w-px ${mark.emphasized ? "bg-burgundy" : "bg-black/30"} ${
                  align === "left" ? "" : align === "right" ? "ml-auto" : "mx-auto"
                }`}
              />
              <span
                className={`mt-2 block font-mono whitespace-nowrap ${
                  align === "left"
                    ? ""
                    : align === "right"
                      ? "-translate-x-full"
                      : "-translate-x-1/2"
                } ${
                  mark.emphasized
                    ? "text-burgundy text-base font-bold"
                    : "text-[11px] text-black/50"
                }`}
              >
                {mark.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
