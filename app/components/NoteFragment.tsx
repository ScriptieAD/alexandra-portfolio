"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import ReviewStamp from "./ReviewStamp";

function fadeUpVariant(delay: number, distance = 18) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function NoteFragment({
  id,
  title,
  copy,
  highlight,
  variant = "typed",
  stamp,
  margin,
  rotate = -1,
  delay = 0,
  className = "",
}: {
  id: string;
  title: string;
  copy: ReactNode;
  highlight?: string;
  variant?: "typed" | "memo";
  stamp?: string;
  margin?: string;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isMemo = variant === "memo";

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={`relative ${className}`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: `rotate(${rotate}deg) translateY(${hovered ? -4 : 0}px)`,
        }}
        className={`group relative p-6 transition-transform duration-300 ease-out sm:p-7 ${
          isMemo
            ? "bg-[#faf8f4] shadow-paper-xs border border-black/10"
            : "border-t border-black/10"
        }`}
      >
        {isMemo && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-8 h-3 w-8 -rotate-6 rounded-[2px] bg-pink-300/70"
          />
        )}

        {stamp && (
          <div className="absolute -top-3 -right-3 z-10">
            <ReviewStamp
              label={stamp}
              onLoad
              rotate={isMemo ? 8 : -8}
              delay={delay + 0.4}
            />
          </div>
        )}

        <motion.p
          variants={fadeUpVariant(delay)}
          className="text-burgundy/70 font-mono text-[10px] tracking-[0.22em] uppercase"
        >
          Note_{id}
        </motion.p>

        <motion.h3
          variants={fadeUpVariant(delay + 0.1)}
          className={`mt-3 leading-tight ${
            isMemo ? "font-hand text-3xl" : "font-serif text-2xl font-light"
          }`}
        >
          {title}
        </motion.h3>

        <motion.div
          variants={fadeUpVariant(delay + 0.2)}
          className="mt-3 max-w-sm text-[15px] leading-[1.7] text-black/60"
        >
          {copy}
        </motion.div>

        {highlight && (
          <motion.p
            variants={fadeUpVariant(delay + 0.32)}
            className="relative mt-5 inline-block font-mono text-sm font-semibold text-black/70"
          >
            {highlight}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 14"
              className="text-burgundy/50 absolute -bottom-1.5 left-0 h-2.5 w-full transition-colors duration-300 group-hover:text-burgundy"
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
          </motion.p>
        )}

        {margin && (
          <motion.p
            variants={fadeUpVariant(delay + 0.45, 8)}
            className="font-hand text-burgundy/60 mt-5 -rotate-2 text-sm leading-none"
          >
            {margin}
          </motion.p>
        )}
      </div>
    </motion.article>
  );
}
