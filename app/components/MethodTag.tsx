"use client";

import { motion } from "motion/react";
import { getTechColor } from "./techColors";

export default function MethodTag({
  children,
  rotate = 0,
  delay = 0,
  className = "",
}: {
  children: string;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const color = getTechColor(children);

  return (
    <motion.span
      initial={{ opacity: 0, y: 6, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderColor: `${color}66`,
        color,
        backgroundColor: `${color}0d`,
      }}
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase shadow-sm ${className}`}
    >
      {children}
    </motion.span>
  );
}
