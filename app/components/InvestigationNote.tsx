"use client";

import { motion, useReducedMotion } from "motion/react";

export default function InvestigationNote({
  className = "",
  rotate = -2,
  delay = 0.5,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay }}
      whileHover={
        prefersReducedMotion ? undefined : { rotate: rotate + 1, y: -4 }
      }
      className={`flex max-w-[380px] flex-col items-start pl-[16%] pr-[8%] text-left sm:pl-[17%] lg:max-w-[550px] lg:pl-[16%] lg:pr-[4%] ${className}`}
    >
      <p className="text-burgundy mb-[8px] font-mono text-[13px] font-semibold tracking-[0.15em] uppercase lg:mb-[10px] lg:text-[14px] lg:tracking-[0.13em]">
        Investigative note
      </p>

      <p className="font-hand text-ink/85 text-[19px] leading-[1.35] lg:text-[19px] lg:leading-[1.4]">
        &ldquo;The outliers aren&apos;t noise.
        <br />
        They&apos;re where the{" "}
        <span className="relative inline-block">
          story hides.
          <svg
            aria-hidden="true"
            viewBox="0 0 100 14"
            className="text-burgundy/70 absolute -bottom-1 left-0 h-2.5 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M2 8 Q 25 2 50 7 T 98 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
        &rdquo;
      </p>

      <p className="font-hand text-ink/70 mt-[6px] text-[16px] lg:mt-[8px] lg:text-[16px]">
        — A.C.
      </p>
    </motion.div>
  );
}
