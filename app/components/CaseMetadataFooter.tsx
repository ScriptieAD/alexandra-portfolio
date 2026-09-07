"use client";

import { motion } from "motion/react";

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

export default function CaseMetadataFooter({
  caseId = "Case 001",
  title,
  status = "Calibrated",
  stack,
  pageNumber = "11 / 11",
  archivedLabel = "Review complete",
  note = "case closed.",
  delay = 0,
  className = "",
}: {
  caseId?: string;
  title: string;
  status?: string;
  stack: string;
  pageNumber?: string;
  archivedLabel?: string;
  note?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      <motion.div
        variants={fadeUpVariant(delay)}
        className="flex flex-wrap items-baseline justify-between gap-6"
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            {caseId}
          </p>
          <p className="mt-1 font-serif text-xl">{title}</p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Status
          </p>
          <p className="text-burgundy mt-1 font-mono text-sm font-bold uppercase">
            {status}
          </p>
        </div>
      </motion.div>

      <motion.p
        variants={fadeUpVariant(delay + 0.1)}
        className="mt-4 font-mono text-xs text-black/50"
      >
        Stack <span className="text-black/70">{stack}</span>
      </motion.p>

      <motion.div
        variants={fadeUpVariant(delay + 0.2)}
        className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-black/35 uppercase"
      >
        <span>{archivedLabel}</span>
        <span>{pageNumber}</span>
      </motion.div>

      <motion.p
        variants={fadeUpVariant(delay + 0.3)}
        className="font-hand text-burgundy/70 mt-6 -rotate-2 text-lg leading-none"
      >
        {note}
      </motion.p>
    </motion.div>
  );
}
