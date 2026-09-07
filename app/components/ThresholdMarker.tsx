"use client";

import { motion } from "motion/react";

export default function ThresholdMarker({
  x,
  yTop,
  yBottom,
  yPrecision,
  yRecall,
  label = "Chosen operating point",
  delay = 0,
}: {
  x: number;
  yTop: number;
  yBottom: number;
  yPrecision: number;
  yRecall: number;
  label?: string;
  delay?: number;
}) {
  return (
    <motion.g
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4, delay } },
      }}
    >
      <line
        x1={x}
        y1={yTop}
        x2={x}
        y2={yBottom}
        stroke="#171717"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />

      <motion.circle
        cx={x}
        cy={yPrecision}
        r={10}
        fill="none"
        stroke="#8f2138"
        strokeWidth="1.4"
        strokeOpacity="0.75"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{ transformOrigin: `${x}px ${yPrecision}px` }}
      />

      <motion.circle
        cx={x}
        cy={yRecall}
        r={10}
        fill="none"
        stroke="#171717"
        strokeWidth="1.4"
        strokeOpacity="0.45"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4, delay: delay + 0.22, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{ transformOrigin: `${x}px ${yRecall}px` }}
      />

      <motion.g
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <rect
          x={x - 66}
          y={yTop - 28}
          width={132}
          height={20}
          fill="#f4f1eb"
          stroke="#8f2138"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x={x}
          y={yTop - 14}
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fill="#8f2138"
          letterSpacing="0.6"
          className="font-mono uppercase"
        >
          {label}
        </text>
      </motion.g>
    </motion.g>
  );
}
