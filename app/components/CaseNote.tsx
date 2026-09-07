"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function CaseNote({
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
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      className={`border-t border-black/10 pt-8 ${className}`}
    >
      <p className="max-w-2xl text-sm leading-[1.8] text-black/55 italic">{children}</p>
    </motion.div>
  );
}
