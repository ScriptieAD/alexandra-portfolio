"use client";

import { motion } from "motion/react";

export default function ProjectsIntro() {
  return (
    <div className="relative">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-burgundy text-xs font-semibold uppercase tracking-[0.32em]"
      >
        Projects
      </motion.p>

      {/* lg+ uses a viewport-scaled clamp instead of a fixed size: the
          intro column is a fixed 32% of the viewport there, so a static
          size that fits at 1536px would overflow its own line-reveal
          mask (clipping "investigations" instead of wrapping) at 1024px */}
      <h2 className="mt-6 max-w-md font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:max-w-none lg:text-[clamp(2.25rem,calc(5vw_-_5.7px),4.5rem)]">
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Selected
          </motion.span>
        </span>

        <span className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            investigations
            <span className="text-burgundy">.</span>
          </motion.span>
        </span>
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-burgundy mt-6 h-px w-16 origin-left"
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 max-w-sm text-lg leading-[1.65] text-black/55"
      >
        I build investigations around patterns, behaviour, systems and the
        occasional anomaly.
      </motion.p>
    </div>
  );
}
