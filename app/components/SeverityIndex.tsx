"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

type SeverityLevel = {
  label: string;
  count: number;
  caption: string;
};

const LEVELS: SeverityLevel[] = [
  { label: "LOW", count: 935, caption: "close to threshold" },
  { label: "MEDIUM", count: 309, caption: "meaningful deviation" },
  { label: "HIGH", count: 89, caption: "strong deviation" },
  { label: "EXTREME", count: 33, caption: "far beyond expected behaviour" },
];

const LABEL_STYLES: Record<string, string> = {
  LOW: "text-black/45 text-base font-normal",
  MEDIUM: "text-black/65 text-lg font-medium",
  HIGH: "text-ink text-xl font-semibold",
  EXTREME: "text-burgundy text-2xl font-bold",
};

function fadeUpVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function SeverityCount({
  value,
  active,
  delay,
}: {
  value: number;
  active: boolean;
  delay: number;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, value, {
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, motionValue, value, delay]);

  return <motion.span className="text-ink font-mono text-lg font-bold">{display}</motion.span>;
}

export default function SeverityIndex({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Severity index
      </p>

      <div className="mt-5">
        {LEVELS.map((level, i) => (
          <motion.div
            key={level.label}
            variants={fadeUpVariant(delay + i * 0.12)}
            onMouseEnter={() => setHovered(level.label)}
            onMouseLeave={() => setHovered((h) => (h === level.label ? null : h))}
            onFocus={() => setHovered(level.label)}
            onBlur={() => setHovered((h) => (h === level.label ? null : h))}
            tabIndex={0}
            className="border-t border-black/10 py-4 first:border-t-0 focus:outline-none"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className={`font-mono tracking-[0.06em] ${LABEL_STYLES[level.label]}`}>
                {level.label}
              </span>
              <SeverityCount
                value={level.count}
                active={inView}
                delay={delay + i * 0.12 + 0.2}
              />
            </div>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                hovered === level.label ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-sm text-xs leading-relaxed text-black/50 italic">
                  {level.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
