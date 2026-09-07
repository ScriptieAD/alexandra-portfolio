"use client";

import { useCallback, useState } from "react";
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
    tag: "Input",
    title: "Raw Transactions",
    text: "Individual transaction records containing amount, sender, receiver, geography, channel and transaction type.",
    detail: "source: transactions.csv",
    rotate: -1.5,
    offsetY: 6,
  },
  {
    num: "02",
    tag: "Feature Engineering",
    title: "Monthly Behaviour",
    text: "Transactions are aggregated by customer and month to create behavioural features such as total volume, transaction count, largest transaction and cross-border activity.",
    detail: "source: behaviour_features.py",
    rotate: 1,
    offsetY: -10,
    annotation: "context matters",
    annotationRotate: -4,
  },
  {
    num: "03",
    tag: "Detection",
    title: "AML Rules",
    text: "Behavioural indicators are evaluated against rule thresholds to identify unusual activity.",
    detail: "source: rules_engine.py",
    rotate: -1,
    offsetY: 4,
  },
  {
    num: "04",
    tag: "Triage",
    title: "Alerts",
    text: "Each triggered rule generates an alert with its metric value and threshold.",
    detail: "source: alerts.py",
    rotate: 1.4,
    offsetY: -8,
  },
  {
    num: "05",
    tag: "Investigation",
    title: "Cases",
    text: "Alerts for the same customer and month are grouped into one investigation case.",
    detail: "source: case_grouping.py",
    rotate: -1.2,
    offsetY: 6,
  },
  {
    num: "06",
    tag: "Calibration",
    title: "Threshold Calibration",
    text: "Hidden ground-truth labels are used only after detection to evaluate precision, recall and the operational trade-off between stricter and broader monitoring.",
    detail: "source: calibration_report.py",
    rotate: 1,
    offsetY: -4,
    annotation: "strict ≠ always better",
    annotationRotate: 3,
  },
];

const EMPHASIZED = new Set([2, 3, 4]);

function DesktopStep({
  index,
  onHoverChange,
}: {
  index: number;
  onHoverChange: (index: number, hovering: boolean) => void;
}) {
  const step = STEPS[index];
  const emphasized = EMPHASIZED.has(index);

  return (
    <div role="listitem" className="min-w-0 flex-1">
      <motion.div
        initial={{ opacity: 0, y: step.offsetY + 26, rotate: step.rotate - 3 }}
        whileInView={{ opacity: 1, y: step.offsetY, rotate: step.rotate }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <InvestigationStep
          step={step}
          emphasized={emphasized}
          delay={index * 0.1}
          onHoverChange={(h) => onHoverChange(index, h)}
        />
      </motion.div>

      {step.annotation && (
        <InvestigationAnnotation
          className="mt-6 ml-1"
          rotate={step.annotationRotate}
          delay={1.5}
        >
          {step.annotation}
        </InvestigationAnnotation>
      )}
    </div>
  );
}

function DesktopConnector({
  a,
  b,
  hovered,
  delay,
  emphasized = false,
}: {
  a: number;
  b: number;
  hovered: number | null;
  delay: number;
  emphasized?: boolean;
}) {
  return (
    <div aria-hidden="true" className="w-10 shrink-0 pt-4 xl:w-16">
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

        {/* DESKTOP TRAIL */}
        <div
          role="list"
          aria-label="AML investigation pipeline stages"
          className="mt-20 hidden items-start lg:flex"
        >
          <DesktopStep index={0} onHoverChange={handleHoverChange} />
          <DesktopConnector a={0} b={1} hovered={hovered} delay={0.08} />
          <DesktopStep index={1} onHoverChange={handleHoverChange} />
          <DesktopConnector a={1} b={2} hovered={hovered} delay={0.18} />

          <div role="listitem" className="relative min-w-0 flex-[3]">
            <div
              aria-hidden="true"
              className="bg-burgundy/[0.05] absolute -inset-x-8 -inset-y-10 -z-10"
            />
            <div role="list" className="flex items-start">
              <DesktopStep index={2} onHoverChange={handleHoverChange} />
              <DesktopConnector a={2} b={3} hovered={hovered} delay={0.4} emphasized />
              <DesktopStep index={3} onHoverChange={handleHoverChange} />
              <DesktopConnector a={3} b={4} hovered={hovered} delay={0.52} emphasized />
              <DesktopStep index={4} onHoverChange={handleHoverChange} />
            </div>
          </div>

          <DesktopConnector a={4} b={5} hovered={hovered} delay={0.72} />
          <DesktopStep index={5} onHoverChange={handleHoverChange} />
        </div>

        {/* MOBILE TRAIL */}
        <div
          role="list"
          aria-label="AML investigation pipeline stages"
          className="relative mt-16 flex flex-col gap-14 lg:hidden"
        >
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="bg-black/15 absolute top-1 bottom-1 left-[15px] w-px"
          />

          {STEPS.map((step, i) => {
            const emphasized = EMPHASIZED.has(i);
            return (
              <div key={step.num} role="listitem" className="relative pl-11">
                {emphasized && (
                  <div
                    aria-hidden="true"
                    className="bg-burgundy/[0.05] absolute -inset-x-4 -inset-y-4 -z-10"
                  />
                )}

                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-[15px] h-2.5 w-2.5 -translate-x-1/2 rounded-full ${
                    emphasized ? "bg-burgundy" : "bg-black/30"
                  }`}
                />

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -22 : 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <InvestigationStep step={step} emphasized={emphasized} delay={i * 0.1} />
                </motion.div>

                {step.annotation && (
                  <InvestigationAnnotation
                    className="mt-5"
                    rotate={step.annotationRotate}
                    delay={0.6}
                  >
                    {step.annotation}
                  </InvestigationAnnotation>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
