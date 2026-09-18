"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MouseEvent } from "react";
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react";
import type { CaseFile } from "../projects-data";
import FileTab from "./FileTab";
import CaseTab from "./CaseTab";
import EvidenceTag from "./EvidenceTag";
import MethodTag from "./MethodTag";
import StampEffect from "./StampEffect";
import SectionLabel from "./SectionLabel";
import InvestigationAnnotation from "./InvestigationAnnotation";
import CaseDossierVisual from "./CaseDossierVisual";
import NetworkInvestigationBoard from "./NetworkInvestigationBoard";
import ResearchChartBoard from "./ResearchChartBoard";

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Resting tilt per card, from the collapsed stack down to the last file —
// intentionally tiny, just enough to read as physically stacked paper.
const REST_ROTATE = [-0.3, 0.25, -0.15];

// Depth progression down the stack: the top file reads as lifted above the
// pile, each one below sits a little flatter/further tucked underneath.
const REST_SHADOW = ["shadow-paper-md", "shadow-paper-sm", "shadow-paper-xs"];
// Every card now shows its full contents permanently, so the overlap has to
// be generous for the pile to still read as "one over another" rather than
// a plain list — each file mostly covers the top of the one behind it.
const OVERLAP = ["mt-0", "-mt-24 sm:-mt-32", "-mt-28 sm:-mt-36"];

/* ---------------------------------------------------------------------- */
/* Responsive / input-capability helpers                                  */
/* ---------------------------------------------------------------------- */

function subscribe(query: string, callback: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ---------------------------------------------------------------------- */
/* Evidence visual — the same per-project evidence pieces used elsewhere, */
/* enlarged for the expanded right-hand panel.                            */
/* ---------------------------------------------------------------------- */

function EvidenceVisual({ item, active }: { item: CaseFile; active: boolean }) {
  if (item.evidence.kind === "dossier") {
    return <CaseDossierVisual evidence={item.evidence} active={active} />;
  }

  if (item.evidence.kind === "stats") {
    return (
      <div className="relative mx-auto w-full max-w-[400px]">
        <div
          aria-hidden="true"
          className="bg-manila/50 shadow-paper-xs absolute top-3 -left-4 h-[92%] w-[94%] rotate-3 rounded-[2px]"
        />
        <div className="relative -rotate-2">
          <Image
            src="/torn-paper-note.png"
            alt=""
            width={1254}
            height={1254}
            className="h-auto w-full drop-shadow-[0_16px_28px_rgba(64,45,35,0.16)]"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 px-[20%] py-[26%]">
            <p className="font-mono text-[9px] tracking-[0.16em] text-black/40 uppercase">
              Alert log
            </p>
            {item.evidence.items.map((stat) => (
              <p key={stat.label} className="font-mono text-[15px] leading-tight text-black/75">
                <span className="text-ink font-bold">{stat.value}</span>{" "}
                {stat.label.toLowerCase()}
              </p>
            ))}
          </div>
          <StampEffect
            label="Evidence found"
            show={active}
            tone="ink"
            rotate={-8}
            className="-right-3 -bottom-3 scale-90"
          />
        </div>
      </div>
    );
  }

  if (item.evidence.kind === "network") {
    return (
      <NetworkInvestigationBoard
        labels={item.evidence.labels}
        metrics={item.metrics}
        active={active}
      />
    );
  }

  return (
    <ResearchChartBoard
      src={item.evidence.src}
      width={item.evidence.width}
      height={item.evidence.height}
      alt={item.evidence.alt}
      active={active}
    />
  );
}

/* ---------------------------------------------------------------------- */
/* One collapsible case file                                              */
/* ---------------------------------------------------------------------- */

function CaseFileCard({
  item,
  index,
  isSelected,
  isFront,
  isAnyFront,
  canHover,
  isCompact,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  item: CaseFile;
  index: number;
  isSelected: boolean;
  isFront: boolean;
  isAnyFront: boolean;
  canHover: boolean;
  isCompact: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const visualParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const prefersReducedMotion = useReducedMotion();

  // Cards drift at a slightly different speed each — top card slowest,
  // bottom card fastest — so the stack reads as several paper layers
  // moving at different depths rather than one flat block.
  const driftRange = prefersReducedMotion ? 0 : 20 + index * 14;
  const cardDrift = useTransform(scrollYProgress, [0, 1], [driftRange, -driftRange]);
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.99, 1, 0.99],
  );

  // Foreground pills (case tab, confidential badge) sit "closer to the
  // viewer" than the folder itself, so they drift noticeably faster.
  const pillDrift = useTransform(scrollYProgress, [0, 1], [driftRange * 1.6, -driftRange * 1.6]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.4 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [1.6, -1.6]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-1.6, 1.6]);
  const badgeFloat = useTransform(springY, [-0.5, 0.5], [-2.5, 2.5]);
  const visualShiftX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const visualShiftY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    if (prefersReducedMotion || !canHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
    if (canHover) onHoverEnd();
  }

  function handleSelect() {
    onSelect();
    cardRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <motion.div
      style={{ position: "relative", zIndex: isFront ? 40 : 30 - index * 10 }}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: -70,
              rotate: index % 2 === 0 ? -9 : 9,
              scale: 0.9,
            }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate: 0, scale: 1 }
      }
      viewport={{ once: true, margin: "-120px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0.4 }
          : {
              type: "spring",
              stiffness: 140,
              damping: 15,
              mass: 0.8,
              delay: index * 0.15,
            }
      }
    >
      <motion.div className="relative" style={{ y: cardDrift, scale: cardScale }}>
        <motion.article
        ref={cardRef}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.9,
          delay: isFront ? 0 : isAnyFront ? 0.1 : 0,
        }}
        style={{
          transformPerspective: 1000,
          rotateX: prefersReducedMotion ? 0 : tiltX,
          rotateY: prefersReducedMotion ? 0 : tiltY,
        }}
        onMouseEnter={canHover ? onHoverStart : undefined}
        onMouseLeave={handlePointerLeave}
        onMouseMove={handlePointerMove}
        animate={{
          opacity: isAnyFront && !isFront ? 0.55 : 1,
          rotate: isFront || isCompact ? 0 : REST_ROTATE[index % REST_ROTATE.length],
          scale: isFront ? 1.015 : isAnyFront ? 0.985 : 1,
          y: isFront ? -14 : isAnyFront ? 32 : 0,
        }}
        initial={false}
        className={`bg-paper-card relative rounded-[4px] border border-black/10 ${
          item.featured ? "p-7 sm:p-10" : "p-6 sm:p-8"
        } ${OVERLAP[index % OVERLAP.length]} ${
          isFront ? (item.featured ? "shadow-paper-xl" : "shadow-paper-lg") : REST_SHADOW[index % REST_SHADOW.length]
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        {item.featured && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 right-4 select-none font-serif text-[140px] leading-none text-black/[0.035] sm:text-[180px]"
          >
            {item.id}
          </span>
        )}

      <motion.div
        style={{ y: prefersReducedMotion ? 0 : pillDrift }}
        className="absolute -top-3 left-6 z-10"
      >
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={
            prefersReducedMotion
              ? { duration: 0.3 }
              : {
                  type: "spring",
                  stiffness: 260,
                  damping: 14,
                  delay: index * 0.15 + 0.4,
                }
          }
        >
          <motion.div
            animate={{ y: isFront ? [4, 0] : 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
            className={item.featured ? "origin-left scale-110" : undefined}
          >
            <FileTab tone={item.featured ? "stamped" : "neutral"}>Case {item.id}</FileTab>
          </motion.div>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={handleSelect}
        aria-pressed={isSelected}
        className="relative block w-full text-left"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
            <span aria-hidden="true" className="bg-burgundy/50 inline-block h-1.5 w-1.5 rounded-full" />
            {item.category}
          </span>

          <div className="flex shrink-0 items-center gap-3">
            <motion.div style={{ y: prefersReducedMotion ? 0 : pillDrift }}>
              <motion.div
                animate={{ y: isFront ? [4, 0] : 0 }}
                transition={{ duration: 0.3, delay: 0.18, ease: EASE }}
              >
                <motion.span
                  style={{ y: prefersReducedMotion ? 0 : badgeFloat }}
                  className="border-burgundy/50 text-burgundy/85 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] uppercase"
                >
                  <Lock aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={2} />
                  Confidential
                </motion.span>
              </motion.div>
            </motion.div>

            <span
              aria-hidden="true"
              className={`border-burgundy/40 text-burgundy inline-flex h-6 w-6 items-center justify-center rounded-full border transition-transform duration-300 ${
                isFront ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </div>
        </div>

        <motion.div
          animate={{ y: isFront ? [6, 0] : 0 }}
          transition={{ duration: 0.35, delay: 0.25, ease: EASE }}
        >
          <h3
            className={`mt-3 font-serif leading-[1.1] ${
              item.featured ? "text-[27px] sm:text-[34px]" : "text-2xl sm:text-[28px]"
            }`}
          >
            {item.title}
          </h3>

          <p className="border-burgundy/25 mt-3 max-w-md border-l-2 pl-3 text-[13px] leading-snug text-black/40">
            {item.tag}
          </p>
        </motion.div>
      </button>

      <div>
            <Link
              href={item.href}
              aria-label={`Open case file: ${item.title}`}
              className="group mt-7 grid gap-10 border-t border-dashed border-black/15 pt-7 lg:grid-cols-2 lg:items-start lg:gap-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col"
              >
                <SectionLabel index="01">Case overview</SectionLabel>
                <p className="mt-3 max-w-md text-base leading-[1.75] text-black/65">
                  {item.summary}
                </p>

                {item.note && (
                  <>
                    <SectionLabel className="mt-6">Analyst note</SectionLabel>
                    <InvestigationAnnotation className="mt-3 ml-4" rotate={-2.5}>
                      {item.note}
                    </InvestigationAnnotation>
                  </>
                )}

                <SectionLabel index="02" className="mt-7">
                  Analysis method
                </SectionLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <MethodTag key={t}>{t}</MethodTag>
                  ))}
                </div>

                <SectionLabel index="03" className="mt-5">
                  Evidence
                </SectionLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.metrics.map((m) => (
                    <EvidenceTag key={m} tone="outline">
                      {m}
                    </EvidenceTag>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <span className="border-burgundy/30 group-hover:border-burgundy group-hover:bg-burgundy/[0.06] inline-flex w-fit items-center gap-2 rounded-[2px] border px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-burgundy uppercase transition-all duration-[280ms] group-hover:text-burgundy-dark">
                    View case file
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-[280ms] group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      strokeWidth={2.25}
                    />
                  </span>

                  {item.microcopy && (
                    <p className="max-w-[150px] font-mono text-[9px] leading-[1.6] tracking-[0.1em] text-black/40 uppercase">
                      {item.microcopy}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div style={{ y: visualParallax }}>
                <motion.div
                  style={{
                    x: prefersReducedMotion ? 0 : visualShiftX,
                    y: prefersReducedMotion ? 0 : visualShiftY,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
                    className="relative flex min-h-[280px] items-center justify-center lg:-ml-10 lg:w-[calc(100%+2.5rem)]"
                  >
                    {item.evidence.kind === "dossier" && (
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute top-4 right-4 hidden flex-col items-end gap-1 sm:flex"
                        >
                          {["Patterns", "People", "Purpose"].map((word) => (
                            <span
                              key={word}
                              className="font-mono text-[9px] tracking-[0.16em] text-black/25 uppercase"
                            >
                              {word}
                            </span>
                          ))}
                        </div>

                        <p
                          aria-hidden="true"
                          className="font-hand text-burgundy/45 absolute top-4 left-4 hidden max-w-[100px] -rotate-2 text-base leading-snug sm:block"
                        >
                          Different behaviour tells a story.
                        </p>
                      </>
                    )}

                    <EvidenceVisual item={item} active={isFront} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
      </div>
      </motion.article>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/* Stack container                                                        */
/* ---------------------------------------------------------------------- */

export default function StackedCaseFiles({ items }: { items: CaseFile[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isCompact = !useMediaQuery("(min-width: 640px)");
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgDrift = useTransform(sectionProgress, [0, 1], prefersReducedMotion ? [0, 0] : [36, -36]);
  const labelsDrift = useTransform(
    sectionProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-26, 26],
  );

  return (
    <div ref={sectionRef} className="relative z-0">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, y: bgDrift }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px circle at 50% 30%, rgba(143,33,56,0.07), transparent 70%)",
        }}
      />

      <motion.div style={{ y: labelsDrift }}>
        <CaseTab tone="paper" className="mb-6">
          Case index / {items.length} files
        </CaseTab>
      </motion.div>

      <div style={{ perspective: 1200 }}>
        {items.map((item, index) => (
          <CaseFileCard
            key={item.id}
            item={item}
            index={index}
            isSelected={selectedId === item.id}
            isFront={selectedId === item.id || hoveredId === item.id}
            isAnyFront={selectedId !== null || hoveredId !== null}
            canHover={canHover}
            isCompact={isCompact}
            onSelect={() =>
              setSelectedId((current) => (current === item.id ? null : item.id))
            }
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() =>
              setHoveredId((current) => (current === item.id ? null : current))
            }
          />
        ))}
      </div>
    </div>
  );
}
