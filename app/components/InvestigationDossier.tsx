"use client";

import { useId, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import CaseFileSheet from "./CaseFileSheet";
import EvidencePolaroid from "./EvidencePolaroid";
import InvestigationNote from "./InvestigationNote";
import EvidenceChart from "./EvidenceChart";
import ArchiveLabel from "./ArchiveLabel";

const STACK_SHEETS: { z: number; rotate: number; x: number; y: number; bg: string }[] = [
  { z: 6, rotate: -2.3, x: -31, y: 27, bg: "#dfd3b6" },
  { z: 7, rotate: 2, x: 27, y: -23, bg: "#e6dbc2" },
  { z: 8, rotate: -1.5, x: -20, y: 16, bg: "#ece2cf" },
  { z: 9, rotate: 1.1, x: 16, y: -13, bg: "#f0e8d6" },
  { z: 10, rotate: -0.7, x: -10, y: 8, bg: "#f4eede" },
  { z: 11, rotate: 0.4, x: 6, y: -6, bg: "#f8f3ea" },
];

function Layer({
  className,
  parallax,
  children,
}: {
  className: string;
  parallax?: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={parallax ? { y: parallax } : undefined}
    >
      {children}
    </motion.div>
  );
}

function FolderTab({
  label,
  className,
  delay,
}: {
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={`bg-manila-dark/70 absolute hidden h-[9%] items-center justify-center rounded-t-md font-mono text-[8px] font-semibold tracking-[0.14em] text-black/45 uppercase sm:flex ${className}`}
    >
      {label}
    </motion.div>
  );
}

function PaperClip({ className, delay }: { className: string; delay: number }) {
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();

  return (
    <motion.svg
      viewBox="0 0 44 100"
      className={`absolute drop-shadow-[0_8px_12px_rgba(23,23,23,0.3)] ${className}`}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -30, rotate: -20 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate: -9 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 240, damping: 13, delay }}
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f2f2" />
          <stop offset="45%" stopColor="#9c9c9c" />
          <stop offset="100%" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      {/* outer loop */}
      <path
        d="M12 18 C12 8 20 2 28 2 C36 2 42 8 42 18 L42 68 C42 82 31 92 18 92 C6 92 1 83 1 71 L1 30"
        fill="none"
        stroke={`url(#${uid})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* inner loop */}
      <path
        d="M20 18 C20 13 24 10 28 10 C33 10 35 13 35 18 L35 60 C35 70 27 76 20 76 C13 76 9 71 9 63 L9 34"
        fill="none"
        stroke={`url(#${uid})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

const FINGERPRINT_RINGS = Array.from({ length: 8 }, (_, i) => 26 + i * 8);

function FingerprintStamp({ className }: { className: string }) {
  return (
    <div className={`text-ink pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 260" className="h-full w-full">
        {FINGERPRINT_RINGS.map((r) => (
          <path
            key={r}
            d={`M ${110 - r} 130 A ${r} ${r * 1.25} 0 1 1 ${110 + r} 130`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

function MagnifyingGlass({
  className,
  delay,
  parallax,
}: {
  className: string;
  delay: number;
  parallax?: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute hidden sm:block ${className}`}
      style={parallax ? { y: parallax } : undefined}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: 30, rotate: -10 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, rotate: 10 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03, rotate: 6 }}
    >
      <Image
        src="/sticker-magnifying-glass.png"
        alt=""
        width={1122}
        height={1402}
        className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(23,23,23,0.35)]"
      />
    </motion.div>
  );
}

function DriedFlowers({
  className,
  delay,
  rotate = -6,
  parallax,
}: {
  className: string;
  delay: number;
  rotate?: number;
  parallax?: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className}`}
      style={parallax ? { y: parallax } : undefined}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -18, rotate: rotate - 8 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 130, damping: 16, delay }}
    >
      <Image
        src="/sticker-dried-flowers.png"
        alt=""
        width={1086}
        height={1448}
        className="h-full w-full object-contain drop-shadow-[0_14px_20px_rgba(23,23,23,0.25)]"
      />
    </motion.div>
  );
}

export default function InvestigationDossier({
  onOpenCase,
}: {
  onOpenCase?: () => void;
}) {
  const dossierRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: dossierRef,
    offset: ["start end", "end start"],
  });

  const folderParallax = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const paperParallax = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const polaroidParallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const noteParallax = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const magnifierParallax = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const flowerParallax = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const glowX = useSpring(pointerX, { stiffness: 50, damping: 22 });
  const glowY = useSpring(pointerY, { stiffness: 50, damping: 22 });
  const glowBackground = useMotionTemplate`radial-gradient(460px circle at ${glowX}% ${glowY}%, rgba(244,241,235,0.5), transparent 72%)`;

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div
      ref={dossierRef}
      onMouseMove={handlePointerMove}
      className="relative mx-auto w-full max-w-[440px] min-h-[760px] sm:min-h-[900px] lg:max-w-[480px] lg:min-h-[528px] xl:max-w-[544px] xl:min-h-[560px]"
    >
      {/* cursor-follow light, like light moving over paper */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 mix-blend-overlay"
          style={{ background: glowBackground }}
        />
      )}

      {/* scaled composition — shrinks the whole dossier as one unit at lg+,
          so every fixed-px text size and offset that was already tuned
          stays in proportion instead of drifting when just the outer
          box is resized */}
      <div className="absolute top-0 left-0 h-full w-full lg:h-[660px] lg:w-[600px] lg:origin-top-left lg:scale-[0.8] xl:h-[700px] xl:w-[680px]">
      {/* everything except the main case sheet */}
      <div className="absolute inset-0">
        {/* base folder — oversized and rotated, like it was dropped on the desk first */}
        <Layer
          className="-left-[5%] top-[2%] z-0 h-[88%] w-[104%]"
          parallax={prefersReducedMotion ? undefined : folderParallax}
        >
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotate: -2.6 }}
            className="bg-manila-folder shadow-paper-xl h-full w-full rounded-2xl"
          />
        </Layer>

        {/* fingerprint watermark — subtle, grounds the folder as "evidence" */}
        <FingerprintStamp className="top-[58%] -left-[4%] z-[2] h-[26%] w-[20%] opacity-[0.1]" />

        {/* folder tabs peeking behind the papers */}
        <FolderTab label="Case 01" className="top-[5%] left-[8%] z-[1] w-[16%]" delay={0.1} />
        <FolderTab label="Case 02" className="top-[5%] left-[40%] z-[1] w-[16%]" delay={0.16} />
        <FolderTab label="Case 03" className="top-[5%] left-[68%] z-[1] w-[16%]" delay={0.22} />

        {/* stacked ivory sheets — a thick pile of pages peeking from beneath the main file */}
        {STACK_SHEETS.map((sheet, i) => (
          <motion.div
            key={i}
            className="absolute top-[2%] left-[16%] h-[76%] w-[80%] sm:left-[20%] sm:w-[74%] lg:left-[22%] lg:w-[70%]"
            style={{
              zIndex: sheet.z,
              y: prefersReducedMotion ? undefined : paperParallax,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: 0.08 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                rotate: sheet.rotate,
                x: sheet.x,
                y: sheet.y,
                backgroundColor: sheet.bg,
              }}
              className="shadow-paper-xs h-full w-full rounded-[3px]"
            />
          </motion.div>
        ))}

        {/* evidence polaroid — only its right sliver tucks behind the main
            sheet; keep it mostly clear so the caption never gets cut */}
        <Layer
          className="top-[14%] -left-[3%] z-[15] w-[24%]"
          parallax={prefersReducedMotion ? undefined : polaroidParallax}
        >
          <EvidencePolaroid delay={0.42} />
        </Layer>

        {/* paper clip on the main sheet's corner */}
        <PaperClip className="top-[1%] left-[17%] z-30 w-[7.5%]" delay={0.55} />

        {/* handwritten investigative note — least essential on small screens */}
        <Layer
          className="pointer-events-none top-[80%] left-[14%] z-[25] hidden w-[38%] sm:block"
          parallax={prefersReducedMotion ? undefined : noteParallax}
        >
          <InvestigationNote delay={0.5} />
        </Layer>

        {/* anomaly evidence chart — least essential on small screens */}
        <Layer className="right-[2%] bottom-[6%] z-[22] hidden w-[32%] sm:block">
          <EvidenceChart delay={0.62} />
        </Layer>

        {/* magnifying glass */}
        <MagnifyingGlass
          className="top-[76%] -right-[2%] z-[35] w-[17%]"
          delay={1.1}
          parallax={prefersReducedMotion ? undefined : magnifierParallax}
        />

        {/* dried flower stem — draped along the top-right edge, like it fell on the desk */}
        <DriedFlowers
          className="hidden -top-[7%] -right-[1%] z-[32] w-[22%] sm:block"
          rotate={8}
          delay={1.0}
          parallax={prefersReducedMotion ? undefined : flowerParallax}
        />

        {/* scattered case status notes — least essential on small screens */}
        <ArchiveLabel
          caseNo="02"
          status="Closed"
          updated="3w ago"
          rotate={-3}
          delay={1.15}
          className="bottom-[1%] left-[4%] z-[40] hidden w-[104px] sm:block"
        />
        <ArchiveLabel
          caseNo="01"
          status="Closed"
          rotate={2}
          delay={1.22}
          className="-bottom-[7%] left-[44%] z-[40] hidden w-[92px] sm:block"
        />
        <ArchiveLabel
          caseNo="03"
          status="Active"
          updated="2d ago"
          rotate={-2}
          delay={1.29}
          className="right-[3%] bottom-[2%] z-[40] hidden w-[110px] sm:block"
        />
      </div>

      {/* main case file sheet */}
      <Layer className="top-[2%] left-[16%] z-20 w-[80%] sm:left-[20%] sm:w-[74%] lg:left-[22%] lg:w-[70%]">
        <CaseFileSheet delay={0.28} onOpen={onOpenCase} />
      </Layer>
      </div>
    </div>
  );
}
