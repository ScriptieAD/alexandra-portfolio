"use client";

import Reveal from "./Reveal";
import CalibrationNote from "./CalibrationNote";
import CalibrationChart from "./CalibrationChart";
import { CALIBRATION_POINTS, SELECTED_THRESHOLD } from "./calibrationData";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function PostAnalysisValidation() {
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
            Post-Analysis Validation
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Checking the rules against the labels
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">
            The dataset&apos;s laundering labels were not used to build the
            detection rules or calibrate the underlying behavioural
            features. They were used only afterwards, to evaluate how well
            the rule-based case prioritisation aligned with the dataset&apos;s
            ground truth.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10">
          <CalibrationNote />
        </Reveal>

        <Reveal delay={0.26} className="mt-16">
          <CalibrationChart
            data={CALIBRATION_POINTS}
            defaultThreshold={SELECTED_THRESHOLD}
            delay={0.1}
            className="max-w-3xl"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 max-w-2xl">
          <p className="text-[15px] leading-[1.75] text-black/60">
            Raising the threshold improves precision but reduces recall,
            illustrating the operational trade-off between alert quality and
            detection coverage. Threshold {SELECTED_THRESHOLD.toFixed(1)}× was
            selected as the working threshold for this project, not because
            it is universally optimal, but because it balanced alert quality
            against case coverage for this dataset.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
