"use client";

import { motion } from "motion/react";
import ConfidentialStamp from "./ConfidentialStamp";

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

export default function TriggeredRules({
  rules,
  delay = 0,
  className = "",
}: {
  rules: string[];
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Triggered rules
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        {rules.map((rule, i) => (
          <motion.div key={rule} variants={fadeUpVariant(delay + i * 0.15)}>
            <ConfidentialStamp
              label={rule}
              sublabel="Rule triggered"
              rotate={i % 2 === 0 ? -6 : 5}
              onLoad
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
