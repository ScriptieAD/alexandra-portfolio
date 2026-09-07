"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ThresholdMarker from "./ThresholdMarker";

export type CalibrationPoint = {
  threshold: number;
  precision: number;
  recall: number;
  annotation?: string;
};

const CHART_W = 600;
const CHART_H = 320;
const PAD = { top: 24, right: 96, bottom: 56, left: 40 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;
const GRID_VALUES = [0, 25, 50, 75, 100];

function xFor(i: number, count: number) {
  return PAD.left + (i / (count - 1)) * PLOT_W;
}
function yFor(value: number) {
  return PAD.top + (1 - value / 100) * PLOT_H;
}

function lineVariant(delay: number, duration = 1.2) {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration, delay, ease: [0.65, 0, 0.35, 1] as const },
    },
  };
}

function fadeVariant(delay: number) {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const } },
  };
}

export default function CalibrationChart({
  data,
  defaultThreshold,
  delay = 0,
  className = "",
}: {
  data: CalibrationPoint[];
  defaultThreshold: number;
  delay?: number;
  className?: string;
}) {
  const defaultIndex = data.findIndex((d) => d.threshold === defaultThreshold);
  const [selected, setSelected] = useState(defaultIndex);
  const [hovered, setHovered] = useState<number | null>(null);

  const active = hovered ?? selected;
  const activePoint = data[active];

  const precisionPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xFor(i, data.length)} ${yFor(d.precision)}`)
    .join(" ");
  const recallPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xFor(i, data.length)} ${yFor(d.recall)}`)
    .join(" ");

  const markerX = xFor(defaultIndex, data.length);

  let comparisonLabel: string | null = null;
  if (selected > defaultIndex) comparisonLabel = "More selective";
  else if (selected < defaultIndex) comparisonLabel = "More coverage";

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
          Precision vs recall
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Calibration chart
        </p>
      </div>

      <div className="relative mt-6">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          role="img"
          aria-label="Precision and recall across tested thresholds, from 2.0 to 5.0"
        >
          {/* grid */}
          <motion.g variants={fadeVariant(delay)}>
            {GRID_VALUES.map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  x2={CHART_W - PAD.right}
                  y1={yFor(v)}
                  y2={yFor(v)}
                  stroke="#171717"
                  strokeOpacity={v === 0 ? 0.2 : 0.08}
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={yFor(v) + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#171717"
                  opacity={0.4}
                  className="font-mono"
                >
                  {v}%
                </text>
              </g>
            ))}
          </motion.g>

          {/* recall line (ink) */}
          <motion.path
            d={recallPath}
            fill="none"
            stroke="#171717"
            strokeOpacity={0.55}
            strokeWidth={1.75}
            variants={lineVariant(delay + 0.35)}
          />

          {/* precision line (burgundy) */}
          <motion.path
            d={precisionPath}
            fill="none"
            stroke="#8f2138"
            strokeWidth={2}
            variants={lineVariant(delay + 0.25)}
          />

          {/* direct end labels */}
          <motion.text
            x={CHART_W - PAD.right + 8}
            y={yFor(data[data.length - 1].precision) + 3}
            fontSize="10"
            fontWeight={700}
            fill="#8f2138"
            letterSpacing="0.5"
            className="font-mono uppercase"
            variants={fadeVariant(delay + 1.5)}
          >
            Precision
          </motion.text>
          <motion.text
            x={CHART_W - PAD.right + 8}
            y={yFor(data[data.length - 1].recall) + 3}
            fontSize="10"
            fontWeight={700}
            fill="#171717"
            opacity={0.6}
            letterSpacing="0.5"
            className="font-mono uppercase"
            variants={fadeVariant(delay + 1.6)}
          >
            Recall
          </motion.text>

          {/* data points */}
          {data.map((d, i) => (
            <motion.g key={d.threshold} variants={fadeVariant(delay + 1.1 + i * 0.05)}>
              <circle cx={xFor(i, data.length)} cy={yFor(d.precision)} r={3.2} fill="#8f2138" />
              <circle
                cx={xFor(i, data.length)}
                cy={yFor(d.recall)}
                r={3.2}
                fill="#171717"
                opacity={0.6}
              />
            </motion.g>
          ))}

          {/* active point ring — plain conditional render, not Framer-controlled */}
          <circle
            cx={xFor(active, data.length)}
            cy={yFor(data[active].precision)}
            r={7}
            fill="none"
            stroke="#8f2138"
            strokeWidth={1.4}
            opacity={0.85}
          />

          {/* x-axis labels + annotations */}
          {data.map((d, i) => {
            const edgeAnchor = i === 0 ? "start" : i === data.length - 1 ? "end" : "middle";
            const edgeOffset = i === 0 ? 6 : i === data.length - 1 ? -6 : 0;
            return (
            <motion.g key={d.threshold} variants={fadeVariant(delay + 0.6 + i * 0.05)}>
              <text
                x={xFor(i, data.length)}
                y={CHART_H - PAD.bottom + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#171717"
                opacity={0.5}
                className="font-mono"
              >
                {d.threshold.toFixed(1)}×
              </text>
              {d.annotation && (
                <text
                  x={xFor(i, data.length) + edgeOffset}
                  y={CHART_H - PAD.bottom + 38}
                  textAnchor={edgeAnchor}
                  fontSize="10"
                  fill="#8f2138"
                  opacity={0.7}
                  fontStyle="italic"
                  className="font-hand"
                >
                  {d.annotation}
                </text>
              )}
            </motion.g>
            );
          })}

          <ThresholdMarker
            x={markerX}
            yTop={PAD.top}
            yBottom={CHART_H - PAD.bottom}
            yPrecision={yFor(data[defaultIndex].precision)}
            yRecall={yFor(data[defaultIndex].recall)}
            delay={delay + 1.6}
          />
        </svg>

        {/* click / hover overlay — plain HTML, accessible, no Framer conflicts */}
        <div className="absolute inset-0">
          {data.map((d, i) => (
            <button
              key={d.threshold}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-label={`Threshold ${d.threshold.toFixed(1)}: precision ${d.precision.toFixed(1)}%, recall ${d.recall.toFixed(1)}%`}
              style={{
                left: `${(xFor(i, data.length) / CHART_W) * 100}%`,
                width: `${(PLOT_W / (data.length - 1) / CHART_W) * 100}%`,
              }}
              className="absolute top-0 h-full -translate-x-1/2 cursor-pointer bg-transparent focus:outline-none"
            />
          ))}
        </div>

        {/* tooltip — evidence tag style */}
        {hovered !== null && (
          <div
            style={{
              left: `${(xFor(hovered, data.length) / CHART_W) * 100}%`,
              top: `${(Math.min(yFor(data[hovered].precision), yFor(data[hovered].recall)) / CHART_H) * 100}%`,
            }}
            className="border-burgundy/50 bg-paper pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] border px-3 py-2 font-mono text-[10px] whitespace-nowrap shadow-sm"
          >
            <p className="font-bold tracking-[0.1em] text-black/70 uppercase">
              Threshold {data[hovered].threshold.toFixed(1)}×
            </p>
            <p className="text-burgundy mt-1">Precision {data[hovered].precision.toFixed(1)}%</p>
            <p className="mt-0.5 text-black/60">Recall {data[hovered].recall.toFixed(1)}%</p>
          </div>
        )}
      </div>

      {/* selection readout */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 border-t border-black/10 pt-5">
        <p className="font-mono text-xs text-black/50">
          Selected threshold{" "}
          <span className="text-ink font-bold">{activePoint.threshold.toFixed(1)}×</span>
          <span className="mx-2 text-black/25">·</span>
          Precision <span className="text-burgundy font-bold">{activePoint.precision.toFixed(1)}%</span>
          <span className="mx-2 text-black/25">·</span>
          Recall <span className="text-ink font-bold">{activePoint.recall.toFixed(1)}%</span>
        </p>

        <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
          {selected === defaultIndex
            ? "Chosen operating point"
            : comparisonLabel}
        </p>
      </div>
    </motion.div>
  );
}
