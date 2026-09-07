"use client";

import { motion } from "motion/react";

export type FlowStep = {
  num: string;
  tag: string;
  title: string;
  text: string;
  detail: string;
};

export default function InvestigationStep({
  step,
  emphasized = false,
  delay = 0,
  onHoverChange,
  className = "",
}: {
  step: FlowStep;
  emphasized?: boolean;
  delay?: number;
  onHoverChange?: (hovering: boolean) => void;
  className?: string;
}) {
  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`group relative transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}
    >
      <div className="relative inline-flex h-9 w-9 items-center justify-center">
        {emphasized && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: delay + 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-burgundy/40 absolute inset-0 rounded-full border"
          />
        )}
        <span
          className={`font-mono text-xs ${emphasized ? "text-burgundy font-bold" : "text-black/40"}`}
        >
          {step.num}
        </span>
      </div>

      <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        {step.tag}
      </p>

      <h3
        className={`mt-2 max-w-[15ch] font-serif leading-[1.1] uppercase ${
          emphasized ? "text-burgundy text-[22px]" : "text-ink text-lg"
        }`}
      >
        {step.title}
      </h3>

      <p className="mt-3 max-w-[26ch] text-[13px] leading-[1.7] text-black/55">
        {step.text}
      </p>

      <p className="text-burgundy/55 mt-3 font-mono text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {step.detail}
      </p>
    </div>
  );
}
