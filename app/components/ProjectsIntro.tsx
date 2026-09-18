"use client";

import { motion } from "motion/react";
import { Search } from "lucide-react";
import FileTab from "./FileTab";

export default function ProjectsIntro() {
  return (
    <div className="relative z-0">
      <Search
        aria-hidden="true"
        className="text-ink pointer-events-none absolute -top-8 -left-6 -z-10 h-40 w-40 -rotate-12 opacity-[0.04] sm:h-52 sm:w-52"
        strokeWidth={1}
      />

      <motion.div
        initial={{ opacity: 0, y: -6, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 origin-left"
      >
        <FileTab tone="neutral">Case file — AC</FileTab>
      </motion.div>

      {/* lg+ uses a viewport-scaled clamp instead of a fixed size: the
          intro column is a fixed 32% of the viewport there, so a static
          size that fits at 1536px would overflow its own line-reveal
          mask (clipping the statement instead of wrapping) at 1024px */}
      <h1 className="mt-6 max-w-md leading-[1.05] tracking-tight lg:max-w-none">
        <span className="block overflow-hidden">
          <motion.span
            className="font-serif block text-2xl text-black/60 sm:text-3xl"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Hi, I&apos;m Alexandra.
          </motion.span>
        </span>

        <span className="mt-2 block overflow-hidden pb-[0.1em]">
          <motion.span
            className="font-serif block text-5xl sm:text-6xl lg:text-[clamp(2.25rem,calc(5vw_-_5.7px),4.5rem)]"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I investigate data,{" "}
            <span className="relative inline-block">
              <span className="text-burgundy relative z-10">patterns</span>
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                initial={{ opacity: 0, scale: 1.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
                className="text-burgundy pointer-events-none absolute -inset-x-1.5 -inset-y-0.5"
              >
                <ellipse
                  cx="50"
                  cy="20"
                  rx="48"
                  ry="17"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.55}
                  strokeWidth={1.6}
                  transform="rotate(-3 50 20)"
                />
                <ellipse
                  cx="51"
                  cy="19"
                  rx="46"
                  ry="18.5"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.55}
                  strokeWidth={1.4}
                  transform="rotate(4 51 19)"
                />
              </motion.svg>
            </span>{" "}
            &amp; behaviour.
          </motion.span>
        </span>
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
        className="bg-burgundy mt-6 h-px w-16 origin-left"
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-mono mt-5 max-w-sm text-base leading-[1.7] text-black/55"
      >
        Data Analyst with a focus on Financial Crime, Fraud &amp; behavioural
        analytics. I build practical projects around real-world problems,
        from transaction monitoring to anomaly detection.
      </motion.p>
    </div>
  );
}
