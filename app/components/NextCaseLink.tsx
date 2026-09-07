"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function NextCaseLink({
  title,
  href = "#",
  delay = 0,
  className = "",
}: {
  title?: string;
  href?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={href} className="group inline-flex flex-col items-start gap-1.5 sm:items-end">
        <span className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          Next case
        </span>

        <span className="relative inline-flex items-center gap-2 font-serif text-2xl">
          {title ? `Continue to ${title}` : "Open the next case"}
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1"
          />
          <span
            aria-hidden="true"
            className="bg-burgundy absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          />
        </span>
      </Link>
    </motion.div>
  );
}
