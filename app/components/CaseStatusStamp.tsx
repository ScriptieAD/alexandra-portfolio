"use client";

import { useId } from "react";
import { motion } from "motion/react";

export default function CaseStatusStamp({
  status = "Calibrated",
  ring = "Case Closed",
  caseId = "Case 001",
  rotate = -3,
  delay = 0,
  className = "",
}: {
  status?: string;
  ring?: string;
  caseId?: string;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const uid = useId();
  const topPathId = `${uid}-top`;
  const bottomPathId = `${uid}-bottom`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: rotate - 12 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none aspect-square select-none ${className}`}
    >
      <svg viewBox="0 0 240 240" className="mix-blend-multiply h-full w-full">
        <circle
          cx={120}
          cy={120}
          r={112}
          fill="none"
          stroke="#8f2138"
          strokeWidth={2.4}
          opacity={0.7}
        />
        <circle
          cx={120.6}
          cy={119.4}
          r={104}
          fill="none"
          stroke="#8f2138"
          strokeWidth={1.1}
          opacity={0.4}
        />
        <circle
          cx={120}
          cy={120}
          r={60}
          fill="none"
          stroke="#8f2138"
          strokeWidth={1}
          opacity={0.3}
        />

        <path id={topPathId} d="M 28,120 A 92,92 0 1 1 212,120" fill="none" />
        <path id={bottomPathId} d="M 28,120 A 92,92 0 1 0 212,120" fill="none" />

        <text
          fontSize="13"
          fill="#8f2138"
          letterSpacing="4"
          fontWeight={700}
          className="font-mono uppercase"
        >
          <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
            · {ring} ·
          </textPath>
        </text>

        <text
          fontSize="12"
          fill="#8f2138"
          letterSpacing="3.5"
          fontWeight={700}
          className="font-mono uppercase"
        >
          <textPath href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
            {caseId}
          </textPath>
        </text>

        <text
          x={120}
          y={131}
          textAnchor="middle"
          fontSize="32"
          fill="#8f2138"
          fontWeight={700}
          letterSpacing="-0.5"
          className="font-serif uppercase"
        >
          {status}
        </text>
      </svg>
    </motion.div>
  );
}
