"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import EvidenceCounter from "./EvidenceCounter";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const OUTER_NODES = Array.from({ length: 7 }, (_, i) => {
  const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
  return { x: 90 + Math.cos(angle) * 66, y: 70 + Math.sin(angle) * 56 };
});

function FanDiagram({
  variant,
  title,
  caption,
  delay = 0,
}: {
  variant: "fan-in" | "fan-out";
  title: string;
  caption: string;
  delay?: number;
}) {
  const centerFilled = variant === "fan-out";

  return (
    <div className="border-t border-black/10 pt-8">
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        {title}
      </p>

      <motion.svg
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        viewBox="0 0 180 140"
        className="mt-5 h-auto w-full max-w-[280px]"
        role="img"
        aria-label={caption}
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

      <p className="mt-4 max-w-[26ch] text-[13px] leading-[1.7] text-black/60">
        {caption}
      </p>
    </div>
  );
}

export default function NetworkAnalysis() {
  return (
    <section className="bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
            Network Analysis
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Who&apos;s connected to whom
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-16">
          <FanDiagram
            variant="fan-in"
            title="FAN-IN"
            caption="Many senders send funds to one receiver — activity concentrated into a single destination."
            delay={0.1}
          />
          <FanDiagram
            variant="fan-out"
            title="FAN-OUT"
            caption="One sender distributes funds to many receivers — activity dispersed across counterparties."
            delay={0.2}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-black/10 pt-10">
          <EvidenceCounter
            label="Top fan-out"
            value={40}
            rotate={-2}
            delay={0.1}
            emphasized
          />
          <p className="font-mono text-sm text-black/55">
            <span className="text-ink font-bold">C02177</span> — unique
            receivers
          </p>
        </div>
      </div>
    </section>
  );
}
