"use client";

import { motion } from "motion/react";
import ReviewStamp from "./ReviewStamp";

function fadeUpVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function NextIterationNote({
  id,
  title,
  text,
  extraLine,
  stampLabel,
  delay = 0,
  className = "",
}: {
  id: string;
  title: string;
  text: string;
  extraLine?: string;
  stampLabel?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={`border-burgundy/30 relative border-t pt-6 ${className}`}
    >
      {stampLabel && (
        <div className="absolute -top-3 right-0">
          <ReviewStamp label={stampLabel} rotate={6} delay={delay + 0.5} />
        </div>
      )}

      <motion.p
        variants={fadeUpVariant(delay)}
        className="text-burgundy font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        {id}
      </motion.p>

      <motion.h3
        variants={fadeUpVariant(delay + 0.08)}
        className="mt-2 font-serif text-xl font-light"
      >
        {title}
      </motion.h3>

      <motion.p
        variants={fadeUpVariant(delay + 0.16)}
        className="mt-2 max-w-xs text-sm leading-[1.7] text-black/55"
      >
        {text}
      </motion.p>

      {extraLine && (
        <motion.p
          variants={fadeUpVariant(delay + 0.26)}
          className="mt-3 max-w-xs text-xs leading-relaxed text-black/45 italic"
        >
          {extraLine}
        </motion.p>
      )}
    </motion.div>
  );
}
