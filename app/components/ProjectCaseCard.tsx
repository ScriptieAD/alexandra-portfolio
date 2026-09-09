"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import type { CaseFile } from "../projects-data";
import FileTab from "./FileTab";
import StampEffect from "./StampEffect";

const FINGERPRINT_RINGS = [22, 30, 38, 46, 54, 62];

function FingerprintMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 160" className={className} aria-hidden="true">
      {FINGERPRINT_RINGS.map((r) => (
        <path
          key={r}
          d={`M ${70 - r} 80 A ${r} ${r * 1.25} 0 1 1 ${70 + r} 80`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function EvidenceFocal({ item, hovered }: { item: CaseFile; hovered: boolean }) {
  if (item.evidence.kind === "stats") {
    return (
      <div className="relative mt-4 flex flex-1 items-center justify-end overflow-hidden pr-1">
        <FingerprintMark className="text-burgundy pointer-events-none absolute top-1/2 right-[26%] h-[150px] w-[132px] -translate-y-1/2 opacity-[0.1]" />

        <div className="relative w-[58%] max-w-[200px]">
          <div
            aria-hidden="true"
            className="bg-manila/50 shadow-paper-xs absolute top-2 -left-3 h-[92%] w-[94%] rotate-3 rounded-[2px]"
          />

          <div className="relative -rotate-2">
            <Image
              src="/torn-paper-note.png"
              alt=""
              width={1254}
              height={1254}
              className="h-auto w-full drop-shadow-[0_8px_12px_rgba(64,45,35,0.14)]"
            />

            <div className="absolute inset-0 flex flex-col justify-center gap-1 px-[20%] py-[26%]">
              <p className="font-mono text-[7px] tracking-[0.14em] text-black/40 uppercase">
                Alert log
              </p>
              {item.evidence.items.map((stat) => (
                <p key={stat.label} className="font-mono text-[10.5px] leading-tight text-black/75">
                  <span className="text-ink font-bold">{stat.value}</span>{" "}
                  {stat.label.toLowerCase()}
                </p>
              ))}
            </div>

            <StampEffect
              label="Evidence found"
              show={hovered}
              tone="ink"
              rotate={-8}
              className="-right-2 -bottom-2 scale-[0.62]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-4 flex flex-1 flex-col items-center justify-center">
      <div className="relative w-[76%] max-w-[280px] -rotate-1">
        <span
          aria-hidden="true"
          className="absolute -top-1.5 left-6 z-10 h-3.5 w-7 -rotate-6 rounded-[2px] bg-pink-300/70"
        />
        <Image
          src={item.evidence.src}
          alt={item.evidence.alt}
          width={item.evidence.width}
          height={item.evidence.height}
          className="h-auto w-full shadow-[0_10px_18px_rgba(64,45,35,0.16)]"
        />
        <StampEffect
          label="Evidence found"
          show={hovered}
          tone="ink"
          rotate={-8}
          className="-right-2 -bottom-2 scale-[0.62]"
        />
      </div>
      <p className="mt-2 text-center font-mono text-[9px] tracking-[0.1em] text-black/40 uppercase">
        {item.evidence.alt}
      </p>
    </div>
  );
}

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
        prefersReducedMotion ? undefined : { y: -6, rotate: 0.3 }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-paper-card shadow-paper-sm hover:shadow-paper-md relative flex h-full flex-col rounded-2xl p-5 transition-shadow duration-500 sm:p-6"
    >
      <FileTab tone="neutral" className="absolute -top-3 left-5 z-30">
        Case {item.id}
      </FileTab>

      <div className="flex items-center justify-end">
        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-black/35">
          <Lock aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={2} />
          Confidential
        </span>
      </div>

      <h3 className="mt-3 font-serif text-xl leading-[1.15] font-light sm:text-[22px]">
        {item.title}
      </h3>

      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-burgundy">
        {item.tag}
      </p>

      <p className="mt-1.5 font-mono text-[10px] text-black/45">
        {item.tools.join(" · ")}
      </p>

      <EvidenceFocal item={item} hovered={hovered} />

      <div className="relative mt-4">
        <a
          href={item.href}
          onMouseEnter={triggerStamp}
          onFocus={triggerStamp}
          aria-label={`Open case file: ${item.title}`}
          className="group relative inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-burgundy uppercase transition-colors duration-200 hover:text-burgundy-dark"
        >
          View case file
          <ArrowUpRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
          <span
            aria-hidden="true"
            className="bg-burgundy-dark absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          />
        </a>

        <StampEffect
          label="Access granted"
          show={stamped}
          tone="burgundy"
          rotate={-9}
          className="top-0 right-0 scale-[0.7]"
        />
      </div>
    </motion.article>
  );
}
