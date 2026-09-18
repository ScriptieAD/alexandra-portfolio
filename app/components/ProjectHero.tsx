"use client";

import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import CaseTab from "./CaseTab";
import ConfidentialStamp from "./ConfidentialStamp";
import PinnedNote from "./PinnedNote";
import OtherProjects from "./OtherProjects";

const TAGS = [
  "Python",
  "Pandas",
  "SQL",
  "Behavioural Analytics",
  "Transaction Monitoring",
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ProjectHero({
  caseLabel = "CASE 001",
  eyebrow = "Financial Crime & Fraud Analytics",
  title = "Transaction Monitoring Case Study",
  subtitle = "An end-to-end transaction monitoring case study focused on detecting, prioritising and investigating unusual customer behaviour using behavioural baselines, calibrated thresholds and transaction-network analysis.",
  note = "follow the behaviour, not just the transaction.",
  tags = TAGS,
  status = "Case status: Investigated",
  currentHref = "/projects/aml-transaction-monitoring",
}: {
  caseLabel?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  note?: string;
  tags?: string[];
  status?: string;
  currentHref?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-1.1, 1.6]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 160, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 160, damping: 20 });

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 3.5);
    tiltX.set(py * -3.5);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="bg-paper-quiet relative flex min-h-screen items-center overflow-hidden py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: scrollY, rotate: scrollRotate }
        }
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10"
      >
        <div className="relative mx-auto max-w-[620px] lg:mx-0 lg:ml-[5%] lg:max-w-[620px] xl:ml-[8%]">
          {/* backing sheet — a manila layer peeking out behind the main
              paper, grounding the composition as a physical folder */}
          <div className="bg-manila-folder shadow-paper-lg absolute -top-4 -left-4 h-full w-full -rotate-2 rounded-[3px]" />

          <div
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <CaseTab onLoad delay={0} className="absolute -top-4 left-8 z-20">
              {caseLabel}
            </CaseTab>

            <div className="absolute -top-4 right-20 z-20 hidden gap-2 sm:flex">
              <CaseTab tone="paper" onLoad delay={0.08} className="rotate-1">
                Exhibit A
              </CaseTab>
              <CaseTab tone="paper" onLoad delay={0.14} className="-rotate-1">
                Log 04
              </CaseTab>
            </div>

            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotateX: springTiltX,
                      rotateY: springTiltY,
                      transformPerspective: 1200,
                    }
              }
              className="bg-paper-card shadow-paper-xl relative rounded-[3px] border border-black/[0.06] p-8 transition-shadow duration-500 hover:shadow-[0_4px_10px_rgba(89,32,46,0.16),0_64px_110px_-26px_rgba(89,32,46,0.56)] sm:p-11 lg:p-12"
            >
              <ConfidentialStamp
                onLoad
                delay={0.55}
                className="absolute top-6 right-6 sm:top-8 sm:right-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="text-burgundy max-w-[65%] font-mono text-xs font-semibold tracking-[0.28em] uppercase sm:max-w-[70%]"
              >
                {eyebrow}
              </motion.p>

              <motion.h1
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 1.05, filter: "blur(8px)" }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 max-w-[90%] font-serif text-4xl leading-[1.05] font-light tracking-tight sm:text-5xl lg:text-[3.2rem]"
              >
                {title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-black/15 px-2.5 py-1 font-mono text-[10px] text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="border-burgundy/50 text-burgundy/80 mt-5 inline-block rounded-sm border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.18em] uppercase"
              >
                {status}
              </motion.span>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-md text-[15px] leading-[1.75] text-black/60"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.85, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformOrigin: "left" }}
                className="bg-black/10 mt-8 h-px w-full"
              />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <PinnedNote variant="mini" rotate={-2} className="max-w-[360px]">
                  <span className="font-hand text-ink/85 text-xl leading-snug">
                    &ldquo;{note}&rdquo;
                  </span>
                </PinnedNote>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-end lg:flex">
          <div className="pointer-events-auto mr-[5%] w-full max-w-[260px] xl:mr-[8%]">
            <OtherProjects currentHref={currentHref} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
