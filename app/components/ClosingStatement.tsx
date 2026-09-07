"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function ClosingStatement({
  children,
  subline,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  subline?: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <p className="max-w-xl font-serif text-4xl leading-[1.2] sm:text-5xl lg:text-[3.25rem]">
        {children}
      </p>
      {subline && (
        <p className="mt-6 max-w-md text-base leading-7 text-black/55">{subline}</p>
      )}
    </motion.div>
  );
}
