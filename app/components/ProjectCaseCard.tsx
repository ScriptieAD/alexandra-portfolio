"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import type { CaseFile } from "../projects-data";
import FileTab from "./FileTab";
import PinnedNote from "./PinnedNote";
import StampEffect from "./StampEffect";

export default function ProjectCaseCard({
  item,
  index,
}: {
  item: CaseFile;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [stamped, setStamped] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const triggerStamp = () => {
    setStamped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStamped(false), 1100);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 32,
        rotate: index % 2 === 0 ? -1.4 : 1.4,
        scale: 0.97,
      }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
        delay: index * 0.12,
      }}
      whileHover={
        prefersReducedMotion ? undefined : { y: -8, rotate: 0.3 }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-paper-card shadow-paper-sm hover:shadow-paper-md relative flex h-full flex-col rounded-[22px] border border-black/[0.06] p-8 transition-[box-shadow,border-color] duration-500 hover:border-burgundy/30 md:p-9"
    >
      <FileTab tone="neutral" className="absolute -top-3.5 left-6 z-30">
        Case {item.id}
      </FileTab>

      <div className="flex items-center justify-end">
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-black/35">
          <Lock aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
          Confidential
        </span>
      </div>

      <h3 className="mt-7 font-serif text-2xl leading-[1.15] font-light md:text-[28px]">
        {item.title}
      </h3>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
        {item.tag}
      </p>

      <div className="mt-7">
        <p className="text-[10px] uppercase tracking-[0.22em] text-black/35">
          Tools
        </p>
        <p className="mt-2 text-sm text-black/60">{item.tools.join(" · ")}</p>
      </div>

      <motion.div
        aria-hidden="true"
        className="mt-7 h-px origin-left bg-black/[0.08]"
        animate={{ scaleX: hovered ? 1 : 0.55, opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <PinnedNote
        variant="mini"
        rotate={-1}
        activeRotate={-2}
        active={hovered}
        className="mt-7"
      >
        &ldquo;{item.note}&rdquo;
      </PinnedNote>

      <div className="mt-auto pt-9">
        <a
          href={item.href}
          onMouseEnter={triggerStamp}
          onFocus={triggerStamp}
          aria-label={`Open case file: ${item.title}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-burgundy"
        >
          Open case
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            strokeWidth={2.25}
          />
        </a>
      </div>

      <StampEffect
        label="Evidence found"
        show={hovered}
        tone="ink"
        rotate={-6}
        className="right-7 bottom-24"
      />

      <StampEffect
        label="Access granted"
        show={stamped}
        tone="burgundy"
        rotate={-9}
        className="bottom-9 right-7"
      />
    </motion.article>
  );
}
