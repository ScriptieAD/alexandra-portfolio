"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function CaseStamp({
  className = "",
  delay = 0.85,
}: {
  className?: string;
  delay?: number;
}) {
  const uid = useId();
  const topPathId = `${uid}-top`;
  const bottomPathId = `${uid}-bottom`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.5, rotate: -20 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 0.92 }
          : { opacity: 0.92, scale: [1.5, 0.92, 1.03, 1], rotate: -6 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.34, 1.4, 0.64, 1] }}
      whileHover={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
      className={`pointer-events-auto aspect-square select-none ${className}`}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full mix-blend-multiply">
        <circle
          cx="60"
          cy="60"
          r="57"
          fill="none"
          stroke="#8f2138"
          strokeWidth="1.4"
          opacity="0.65"
        />
        <circle
          cx="60"
          cy="60"
          r="51"
          fill="none"
          stroke="#8f2138"
          strokeWidth="1.4"
          opacity="0.65"
        />
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="#8f2138"
          strokeWidth="0.75"
          opacity="0.35"
        />

        <path id={topPathId} d="M 16,60 A 44,44 0 1 1 104,60" fill="none" />
        <path id={bottomPathId} d="M 16,60 A 44,44 0 1 0 104,60" fill="none" />

        <text
          fontSize="9.5"
          fill="#8f2138"
          letterSpacing="2.4"
          fontWeight="700"
          className="font-mono"
        >
          <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
            · INVESTIGATION ·
          </textPath>
        </text>

        <text
          fontSize="9"
          fill="#8f2138"
          letterSpacing="2.2"
          fontWeight="700"
          className="font-mono"
        >
          <textPath
            href={`#${bottomPathId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            IN PROGRESS
          </textPath>
        </text>

        <text
          x="60"
          y="71"
          textAnchor="middle"
          fontSize="30"
          fill="#8f2138"
          fontWeight="600"
          letterSpacing="-0.5"
          className="font-serif"
        >
          AC
        </text>
      </svg>
    </motion.div>
  );
}
