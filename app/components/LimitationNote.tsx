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

export default function LimitationNote({
  id,
  title,
  text,
  delay = 0,
  className = "",
}: {
  id: string;
  title: string;
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={`border-t border-black/10 pt-6 ${className}`}
    >
      <motion.p
        variants={fadeUpVariant(delay)}
        className="text-burgundy/70 font-mono text-[10px] tracking-[0.2em] uppercase"
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
    </motion.div>
  );
}
