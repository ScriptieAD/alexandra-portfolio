"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function OpenCaseButton({
  href = "#",
  children = "Open case",
  className = "",
  delay = 0.5,
  onLoad = false,
}: {
  href?: string;
  children?: string;
  className?: string;
  delay?: number;
  onLoad?: boolean;
}) {
  const entrance = { opacity: 0, y: 12 };
  const settled = { opacity: 1, y: 0 };
  const transition = { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const };

  const motionProps = onLoad
    ? { initial: entrance, animate: settled, transition }
    : {
        initial: entrance,
        whileInView: settled,
        viewport: { once: true, margin: "-80px" },
        transition,
      };

  return (
    <motion.div {...motionProps} className={className}>
      <Link
        href={href}
        className="group border-burgundy/50 bg-paper-card shadow-paper-xs hover:shadow-paper-sm relative inline-flex items-center gap-3 rounded-[2px] border py-3 pr-6 pl-5 font-mono text-xs font-semibold tracking-[0.16em] text-burgundy uppercase transition-[transform,box-shadow] duration-300 hover:translate-x-1"
      >
        <span
          aria-hidden="true"
          className="bg-burgundy absolute top-1/2 -left-[3px] h-2 w-2 -translate-y-1/2 rotate-45"
        />
        {children}
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      </Link>
    </motion.div>
  );
}
