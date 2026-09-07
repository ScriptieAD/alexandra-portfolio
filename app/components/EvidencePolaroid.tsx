"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

const DOTS: [number, number][] = [
  [10, 18],
  [82, 12],
  [92, 40],
  [8, 52],
  [30, 8],
  [66, 92],
  [88, 78],
  [22, 90],
  [50, 14],
  [6, 76],
];

const NODES: [number, number][] = [
  [18, 70],
  [48, 30],
  [74, 55],
  [58, 84],
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

export default function EvidencePolaroid({
  className = "",
  rotate = -4,
  delay = 0.42,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();
  const pinId = `${uid}-pin`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, rotate: rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { rotate: rotate / 4, y: -5 }
      }
      className={`group shadow-paper-sm relative w-full rounded-[3px] bg-[#faf8f4] p-3 pb-4 lg:pb-9 ${className}`}
    >
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2px] bg-gradient-to-br from-[#2a2622] via-[#1c1a17] to-[#100f0d]">
        {/* faint scattered points — reads as data/network, not a literal photo */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.55" fill="#d9cdb8" opacity="0.4" />
          ))}
        </svg>

        {/* connecting strings + push pins */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={pinId} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#7a7a7a" />
              <stop offset="55%" stopColor="#3d3d3d" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>
          </defs>

          {EDGES.map(([a, b], i) => {
            const [x1, y1] = NODES[a];
            const [x2, y2] = NODES[b];
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#a8324a"
                strokeWidth="0.55"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.85 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: delay + 0.3 + i * 0.1 }}
              />
            );
          })}

          {NODES.map(([x, y], i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 14,
                delay: delay + 0.6 + i * 0.09,
              }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r="1.9" fill={`url(#${pinId})`} />
              <circle cx={x - 0.5} cy={y - 0.5} r="0.5" fill="#fff" opacity="0.5" />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* string trailing past the frame, down onto the desk — hints it
          continues into the wider dossier rather than dead-ending under
          the main sheet on the right */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute bottom-6 left-6 h-14 w-16 overflow-visible"
        aria-hidden="true"
      >
        <motion.line
          x1="62"
          y1="2"
          x2="4"
          y2="94"
          stroke="#a8324a"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: delay + 0.85 }}
        />
        <motion.circle
          cx="4"
          cy="94"
          r="2.2"
          fill={`url(#${pinId})`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: delay + 1 }}
        />
      </svg>

      <p className="mt-3 hidden text-left font-mono text-[10px] font-semibold tracking-[0.2em] text-black/55 uppercase lg:block">
        Pattern
        <br />
        Recognition
      </p>
    </motion.div>
  );
}
