"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const OUTER_NODES = Array.from({ length: 7 }, (_, i) => {
  const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
  return { x: 90 + Math.cos(angle) * 66, y: 70 + Math.sin(angle) * 56 };
});

export default function FanFlowDiagram({
  variant,
  title,
  headline,
  metrics,
  interpretation,
  delay = 0,
  className = "",
}: {
  variant: "fan-in" | "fan-out";
  title: string;
  headline: string;
  metrics: string[];
  interpretation: ReactNode;
  delay?: number;
  className?: string;
}) {
  const centerFilled = variant === "fan-out";

  return (
    <div className={`border-t border-black/10 pt-8 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          {title}
        </p>
        <span className="border-burgundy/50 text-burgundy/80 rounded-sm border px-2 py-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
          {headline}
        </span>
      </div>

      <motion.svg
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        viewBox="0 0 180 140"
        className="mt-6 h-auto w-full max-w-[280px]"
        role="img"
        aria-label={`${title}: ${headline}`}
      >
        {OUTER_NODES.map((node, i) => {
          const [cx, cy] = variant === "fan-in" ? [node.x, node.y] : [90, 70];
          const [ex, ey] = variant === "fan-in" ? [90, 70] : [node.x, node.y];
          return (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke="#8f2138"
              strokeOpacity={0.35}
              strokeWidth={1.2}
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                show: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.5, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />
          );
        })}

        {OUTER_NODES.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={5}
            fill={variant === "fan-in" ? "#171717" : "#faf8f4"}
            fillOpacity={variant === "fan-in" ? 0.45 : 1}
            stroke="#171717"
            strokeOpacity={0.3}
            strokeWidth={variant === "fan-out" ? 1.2 : 0}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, delay: delay + 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />
        ))}

        <motion.circle
          cx={90}
          cy={70}
          r={9}
          fill={centerFilled ? "#8f2138" : "#faf8f4"}
          stroke="#8f2138"
          strokeWidth={1.5}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: { scale: 1, opacity: 1, transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      </motion.svg>

      <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Metrics tracked
      </p>
      <ul className="border-black/[0.08] mt-3 divide-y divide-black/[0.08] border-t font-mono text-[12px]">
        {metrics.map((metric) => (
          <li key={metric} className="flex items-center gap-2.5 py-2.5 text-black/65">
            <span aria-hidden="true" className="text-burgundy/60">
              —
            </span>
            {metric}
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-[32ch] text-[13px] leading-[1.7] text-black/60">
        {interpretation}
      </p>
    </div>
  );
}
