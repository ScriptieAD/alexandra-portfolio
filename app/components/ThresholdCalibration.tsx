"use client";

import Reveal from "./Reveal";
import InsightCallout from "./InsightCallout";
import CalibrationChart, { type CalibrationPoint } from "./CalibrationChart";
import CalibrationComparison from "./CalibrationComparison";
import CalibrationNote from "./CalibrationNote";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CALIBRATION_DATA: CalibrationPoint[] = [
  { threshold: 2.0, precision: 58.7, recall: 74.0, annotation: "broader coverage, noisier queue" },
  { threshold: 2.5, precision: 62.5, recall: 62.3 },
  { threshold: 3.0, precision: 72.1, recall: 51.5, annotation: "best practical trade-off" },
  { threshold: 3.5, precision: 77.0, recall: 47.1 },
  { threshold: 4.0, precision: 77.8, recall: 38.0 },
  { threshold: 5.0, precision: 81.1, recall: 28.9, annotation: "too strict" },
];

export default function ThresholdCalibration() {
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
            Calibration Report / Case Prioritisation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            The Threshold Problem
          </h2>
          <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-xl leading-none">
            strict ≠ always better
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
            The first prioritisation threshold was too strict. At a threshold
            of 5.0, precision reached 81.1% but recall was only 28.9% — the
            system was highly selective, but missed most laundering cases. I
            tested multiple threshold values to find a better operational
            trade-off.
          </p>
        </Reveal>

        <CalibrationChart
          data={CALIBRATION_DATA}
          defaultThreshold={3.0}
          delay={0.1}
          className="mt-16"
        />

        <InsightCallout delay={0.1} className="mt-16 max-w-3xl">
          Detection quality is a trade-off, not a single number.
        </InsightCallout>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
            A stricter threshold improved precision but dramatically reduced
            coverage. Lowering the operating point to 3.0 more than doubled
            recall relative to the original strict configuration while
            retaining 72.1% precision.
          </p>
        </Reveal>

        <CalibrationComparison delay={0.1} className="mt-16" />

        <CalibrationNote delay={0.1} className="mt-16" />
      </div>
    </section>
  );
}
