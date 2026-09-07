"use client";

import { motion } from "motion/react";

export type CaseMetadataItem = {
  label: string;
  value: string;
  accent?: boolean;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const row = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CaseMetadata({
  items,
  className = "",
  delay = 0,
  onLoad = false,
}: {
  items: CaseMetadataItem[];
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const motionProps = onLoad
    ? { initial: "hidden", animate: "show", transition: { delayChildren: delay } }
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-80px" },
        transition: { delayChildren: delay },
      };

  return (
    <motion.dl
      variants={container}
      {...motionProps}
      className={`divide-black/[0.08] border-black/[0.08] divide-y border-t font-mono text-[11px] ${className}`}
    >
      {items.map((entry) => (
        <motion.div
          key={entry.label}
          variants={row}
          className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
        >
          <dt className="text-black/40 uppercase tracking-[0.16em]">
            {entry.label}
          </dt>
          <dd className="flex items-center gap-1.5 text-black/65 sm:text-right">
            {entry.accent && (
              <span className="bg-burgundy h-1.5 w-1.5 rounded-full" />
            )}
            {entry.value}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
