"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent } from "motion/react";

export default function PerformanceMetric({
  value,
  label,
  tone = "burgundy",
  delay = 0,
  className = "",
}: {
  value: number;
  label: string;
  tone?: "burgundy" | "ink";
  delay?: number;
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const motionValue = useMotionValue(value);
  // Rendered as real React text (seeded with the final value) rather than
  // a motion-value-as-child, so the correct number is in the HTML from the
  // first paint instead of depending on the count-up animation to fill it in.
  const [display, setDisplay] = useState(`${value.toFixed(1)}%`);

  useMotionValueEvent(motionValue, "change", (v) => {
    setDisplay(`${v.toFixed(1)}%`);
  });

  useEffect(() => {
    if (!inView) return;
    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`border-t border-black/10 pt-7 first:border-t-0 first:pt-0 ${className}`}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">{label}</p>
      <p
        className={`mt-2 font-mono text-6xl leading-none font-bold sm:text-7xl ${
          tone === "burgundy" ? "text-burgundy" : "text-ink"
        }`}
      >
        <motion.span>{display}</motion.span>
      </p>
    </motion.div>
  );
}
