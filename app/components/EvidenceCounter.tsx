"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

export default function EvidenceCounter({
  label,
  value,
  caption,
  rotate = -2,
  delay = 0,
  emphasized = false,
  className = "",
}: {
  label: string;
  value: number;
  caption?: string;
  rotate?: number;
  delay?: number;
  emphasized?: boolean;
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 1.2,
      delay: delay + 0.15,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={caption ? 0 : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`border-burgundy/50 text-burgundy mix-blend-multiply inline-flex flex-col items-center rounded-[2px] border-[1.5px] px-5 py-4 text-center font-mono focus:outline-none ${
        emphasized ? "bg-burgundy/[0.03]" : ""
      } ${className}`}
    >
      <span className="text-[9px] font-bold tracking-[0.18em] uppercase opacity-70">
        {label}
      </span>
      <motion.span
        className={`mt-1 font-bold leading-none ${emphasized ? "text-3xl" : "text-2xl"}`}
      >
        {rounded}
      </motion.span>

      {caption && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            hovered ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="mix-blend-normal max-w-[10rem] text-[10px] leading-snug font-normal text-black/55 normal-case italic">
              {caption}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
