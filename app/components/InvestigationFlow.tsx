"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import InvestigationStep, { type FlowStep } from "./InvestigationStep";
import FlowConnector from "./FlowConnector";
import InvestigationAnnotation from "./InvestigationAnnotation";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Step = FlowStep & {
  rotate: number;
  offsetY: number;
  annotation?: string;
  annotationRotate?: number;
};

const STEPS: Step[] = [
  {
    num: "01",
    tag: "Customer profiling",
    title: "Customer Profiling",
    text: "I used expected monthly volume and customer attributes to establish behavioural context.",
    detail: "source: customer_profile.py",
    rotate: -1.5,
    offsetY: 6,
  },
  {
    num: "02",
    tag: "Behavioural baseline",
    title: "Monthly Baseline",
    text: "I aggregated transactions by customer and month to build a behavioural baseline for every account.",
    detail: "source: monthly_behavior.py",
    rotate: 1,
    offsetY: -10,
  },
  {
    num: "03",
    tag: "Feature engineering",
    title: "Metric Engineering",
    text: "Seven behavioural metrics per customer-month: total volume, transaction count, average and maximum amount, unique receivers, and volume/maximum vs expected.",
    detail: "source: behaviour_features.py",
    rotate: -1,
    offsetY: 4,
    annotation: "seven signals, one profile",
    annotationRotate: -4,
  },
  {
    num: "04",
    tag: "Calibration",
    title: "Threshold Calibration",
    text: "I derived thresholds from empirical distributions rather than picking them manually.",
    detail: "source: threshold_calibration.py",
    rotate: 1.4,
    offsetY: -8,
  },
  {
    num: "05",
    tag: "Investigation",
    title: "Alert Investigation",
    text: "I reviewed triggered customers using transaction patterns, timing, counterparties and customer context.",
    detail: "source: case_review.py",
    rotate: -1.2,
    offsetY: 6,
    annotation: "rules flag, investigators decide",
    annotationRotate: 3,
  },
];

const EMPHASIZED = new Set([2, 3, 4]);

// Grid-column start classes must be static, literal strings so Tailwind's
// content scanner can find them — an interpolated `col-start-${n}` string
// would not be generated.
const STEP_COL_START = ["lg:col-start-1", "lg:col-start-3", "lg:col-start-5", "lg:col-start-7", "lg:col-start-9"];
const CONNECTOR_COL_START = ["lg:col-start-2", "lg:col-start-4", "lg:col-start-6", "lg:col-start-8"];

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToDesktopQuery(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getIsDesktopServerSnapshot() {
  return false;
}

/**
 * Tracks the lg breakpoint so the same step nodes can use a different
 * Framer Motion entrance — a per-step rotate/offset settle on desktop vs.
 * an alternating left/right slide on mobile — without ever duplicating the
 * step content itself in the DOM. `useSyncExternalStore` keeps this
 * SSR-safe: the server (and the client's first hydration pass) always see
 * `false`, then it syncs to the real viewport immediately after.
 */
function useIsDesktop() {
  return useSyncExternalStore(subscribeToDesktopQuery, getIsDesktopSnapshot, getIsDesktopServerSnapshot);
}

function StepConnector({
  colStartClass,
  hovered,
  a,
  b,
  delay,
  emphasized = false,
}: {
  colStartClass: string;
  hovered: number | null;
  a: number;
  b: number;
  delay: number;
  emphasized?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`hidden pt-4 lg:row-start-1 lg:block ${colStartClass}`}>
      <FlowConnector
        orientation="horizontal"
        emphasized={emphasized}
        highlighted={hovered === a || hovered === b}
        delay={delay}
      />
    </div>
  );
}

export default function InvestigationFlow() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [flowInView, setFlowInView] = useState(false);
  const isDesktop = useIsDesktop();

  const handleHoverChange = useCallback((index: number, hovering: boolean) => {
    setHovered((current) => {
      if (hovering) return index;
      return current === index ? null : current;
    });
  }, []);

  return (
    <section className="bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
            End-to-end pipeline
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            How the investigation works
          </h2>
        </Reveal>

        <motion.div
          role="list"
          aria-label="AML investigation pipeline stages"
          initial={false}
          whileInView={{}}
          onViewportEnter={() => setFlowInView(true)}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-16 grid grid-cols-1 gap-y-14 lg:mt-20 lg:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr_2.5rem_1fr_2.5rem_1fr] lg:items-start lg:gap-y-0"
        >
          {/* mobile-only connecting line — desktop uses the connectors below instead */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: flowInView ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="bg-black/15 absolute top-1 bottom-1 left-[15px] w-px lg:hidden"
          />

          {/* desktop-only shared highlight panel behind the emphasized group */}
          <div
            aria-hidden="true"
            className="bg-burgundy/[0.05] pointer-events-none -z-10 hidden lg:col-start-5 lg:col-end-10 lg:row-start-1 lg:-my-10 lg:block lg:self-stretch"
          />

          {STEPS.map((step, i) => {
            const emphasized = EMPHASIZED.has(i);
            const initial = isDesktop
              ? { opacity: 0, y: step.offsetY + 26, rotate: step.rotate - 3 }
              : { opacity: 0, x: i % 2 === 0 ? -22 : 22 };
            const animate = isDesktop
              ? { opacity: 1, y: step.offsetY, rotate: step.rotate }
              : { opacity: 1, x: 0 };

            return (
              <div
                key={step.num}
                role="listitem"
                className={`relative pl-11 lg:row-start-1 lg:pl-0 ${STEP_COL_START[i]}`}
              >
                {/* mobile-only dot marker */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-[15px] h-2.5 w-2.5 -translate-x-1/2 rounded-full lg:hidden ${
                    emphasized ? "bg-burgundy" : "bg-black/30"
                  }`}
                />

                {/* mobile-only individual highlight (desktop uses the shared panel above) */}
                {emphasized && (
                  <div
                    aria-hidden="true"
                    className="bg-burgundy/[0.05] absolute -inset-x-4 -inset-y-4 -z-10 lg:hidden"
                  />
                )}

                <motion.div
                  initial={initial}
                  whileInView={animate}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <InvestigationStep
                    step={step}
                    emphasized={emphasized}
                    delay={i * 0.1}
                    onHoverChange={(h) => handleHoverChange(i, h)}
                  />
                </motion.div>

                {step.annotation && (
                  <InvestigationAnnotation
                    className="mt-6 ml-1 lg:mt-6"
                    rotate={step.annotationRotate}
                    delay={isDesktop ? 1.5 : 0.6}
                  >
                    {step.annotation}
                  </InvestigationAnnotation>
                )}
              </div>
            );
          })}

          <StepConnector colStartClass={CONNECTOR_COL_START[0]} hovered={hovered} a={0} b={1} delay={0.08} />
          <StepConnector colStartClass={CONNECTOR_COL_START[1]} hovered={hovered} a={1} b={2} delay={0.18} />
          <StepConnector
            colStartClass={CONNECTOR_COL_START[2]}
            hovered={hovered}
            a={2}
            b={3}
            delay={0.4}
            emphasized
          />
          <StepConnector
            colStartClass={CONNECTOR_COL_START[3]}
            hovered={hovered}
            a={3}
            b={4}
            delay={0.52}
            emphasized
          />
        </motion.div>
      </div>
    </section>
  );
}
