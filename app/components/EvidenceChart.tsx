"use client";

import { motion, useReducedMotion } from "motion/react";

const POINTS: [number, number][] = [
  [14, 62],
  [26, 58],
  [38, 64],
  [50, 54],
  [60, 60],
  [67, 18],
  [74, 52],
  [86, 46],
  [98, 42],
];

const LINE_PATH = POINTS.map(
  ([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`,
).join(" ");

const SPIKE = POINTS[5];
const Y_TICKS = [1, 2, 3, 4, 5];

export default function EvidenceChart({
  className = "",
  rotate = 1.5,
  delay = 0.62,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 26, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, x: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className={`group relative ${className}`}
    >
      <p className="max-w-[78%] text-[10px] font-semibold tracking-[0.16em] text-black/45 uppercase sm:text-xs">
        Anomaly score over time
      </p>

      <svg viewBox="0 0 100 76" className="mt-3 h-24 w-full overflow-visible sm:h-28">
        {Y_TICKS.map((tick, i) => {
          const y = 66 - i * 12;
          return (
            <g key={tick}>
              <line
                x1="10"
                y1={y}
                x2="100"
                y2={y}
                stroke="#171717"
                strokeOpacity="0.08"
                strokeWidth="0.6"
              />
              <text
                x="6"
                y={y + 2}
                textAnchor="end"
                fontSize="5"
                fill="#171717"
                opacity="0.35"
                className="font-mono"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <path
          d={LINE_PATH}
          fill="none"
          stroke="#171717"
          strokeOpacity="0.4"
          strokeWidth="1.4"
        />
        <circle
          cx={SPIKE[0]}
          cy={SPIKE[1]}
          r="5.5"
          fill="none"
          stroke="#8f2138"
          strokeWidth="1.3"
          opacity="0.85"
          className="origin-center transition-transform duration-500 ease-out group-hover:scale-125"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle cx={SPIKE[0]} cy={SPIKE[1]} r="1.4" fill="#8f2138" />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 14,
          delay: delay + 0.35,
        }}
        whileHover={prefersReducedMotion ? undefined : { rotate: -2 }}
        className="absolute -top-3 -right-3 rounded-[3px] bg-[#e9dcb0] px-3 py-2 text-center font-mono text-[9px] font-semibold tracking-[0.1em] text-black/60 uppercase shadow-sm sm:text-[10px]"
      >
        Anomaly
        <br />
        Detected
      </motion.div>
    </motion.div>
  );
}
