"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

function ruleVariant(delay: number) {
  return {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function textVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function ReflectionQuote({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={{ hidden: {}, show: {} }}
      className={`text-center ${className}`}
    >
      <motion.span
        aria-hidden="true"
        variants={ruleVariant(delay + 0.1)}
        className="bg-burgundy mx-auto block h-px w-12 origin-center"
      />

      <motion.p
        variants={textVariant(delay)}
        className="mx-auto mt-8 max-w-2xl font-serif text-3xl leading-[1.35] sm:text-4xl lg:text-[2.75rem]"
      >
        {children}
      </motion.p>

      <motion.span
        aria-hidden="true"
        variants={ruleVariant(delay + 0.1)}
        className="bg-burgundy mx-auto mt-8 block h-px w-12 origin-center"
      />
    </motion.div>
  );
}
