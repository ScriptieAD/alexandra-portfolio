"use client";

import { motion } from "motion/react";

function cellVariant(delay: number) {
  return {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function ConfusionMatrix({
  tn,
  fp,
  fn,
  tp,
  delay = 0,
  className = "",
}: {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
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
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Confusion matrix
      </p>

      <div className="mt-5 grid grid-cols-[minmax(0,1.1fr)_1fr_1fr] border-t border-l border-black/10">
        <div className="border-r border-b border-black/10" />
        <motion.div
          variants={cellVariant(delay)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="font-mono text-[9px] tracking-[0.1em] text-black/40 uppercase">
            Predicted
            <br />
            normal
          </p>
        </motion.div>
        <motion.div
          variants={cellVariant(delay + 0.05)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="font-mono text-[9px] tracking-[0.1em] text-black/40 uppercase">
            Predicted
            <br />
            suspicious
          </p>
        </motion.div>

        <motion.div
          variants={cellVariant(delay + 0.1)}
          className="border-r border-b border-black/10 p-3 sm:p-4"
        >
          <p className="font-mono text-[9px] tracking-[0.1em] text-black/40 uppercase">
            Actual
            <br />
            normal
          </p>
        </motion.div>
        <motion.div
          variants={cellVariant(delay + 0.15)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="text-ink font-mono text-2xl font-bold sm:text-3xl">{tn}</p>
        </motion.div>
        <motion.div
          variants={cellVariant(delay + 0.2)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="font-mono text-2xl font-bold text-black/40 sm:text-3xl">{fp}</p>
        </motion.div>

        <motion.div
          variants={cellVariant(delay + 0.25)}
          className="border-r border-b border-black/10 p-3 sm:p-4"
        >
          <p className="font-mono text-[9px] tracking-[0.1em] text-black/40 uppercase">
            Actual
            <br />
            laundering
          </p>
        </motion.div>
        <motion.div
          variants={cellVariant(delay + 0.3)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="font-mono text-2xl font-bold text-black/40 sm:text-3xl">{fn}</p>
        </motion.div>
        <motion.div
          variants={cellVariant(delay + 0.35)}
          className="border-r border-b border-black/10 p-3 text-center sm:p-4"
        >
          <p className="text-burgundy font-mono text-2xl font-bold sm:text-3xl">{tp}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
