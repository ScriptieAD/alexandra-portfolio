"use client";

import Reveal from "./Reveal";
import ThresholdStamp from "./ThresholdStamp";
import PerformanceMetric from "./PerformanceMetric";
import EvidenceCounter from "./EvidenceCounter";
import ConfusionMatrix from "./ConfusionMatrix";
import OutcomeInsight from "./OutcomeInsight";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const OUTCOMES = [
  { label: "caught", value: 176 },
  { label: "false alarms", value: 68 },
  { label: "missed", value: 166 },
  { label: "correctly ignored", value: 956 },
];

export default function FinalCalibrationResult() {
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
            Operating Point / Threshold 3.0
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Final Calibrated Result
          </h2>
          <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-xl leading-none">
            better coverage, still selective
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
            After calibration, the monitoring system identified 176
            laundering cases while maintaining 72.1% precision and improving
            recall to 51.5%.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/60">
            The final threshold prioritised broader laundering coverage
            without creating an unmanageable alert queue.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <ThresholdStamp value="3.0" label="Final threshold" rotate={-4} />
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-16">
          {/* LEFT — precision / recall, the strongest numbers */}
          <div className="order-1 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <PerformanceMetric value={72.1} label="Precision" tone="burgundy" delay={0.2} />
            <PerformanceMetric value={51.5} label="Recall" tone="ink" delay={0.35} />
          </div>

          {/* RIGHT — forensic evidence counters */}
          <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
              Evidence counters
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-5">
              <EvidenceCounter
                label="TP"
                value={176}
                caption="laundering correctly prioritised"
                rotate={-2}
                delay={0.5}
                emphasized
              />
              <EvidenceCounter
                label="FP"
                value={68}
                caption="normal case prioritised"
                rotate={2}
                delay={0.6}
              />
              <EvidenceCounter
                label="FN"
                value={166}
                caption="laundering not prioritised"
                rotate={2}
                delay={0.7}
              />
              <EvidenceCounter
                label="TN"
                value={956}
                caption="normal case correctly left below threshold"
                rotate={-2}
                delay={0.8}
              />
            </div>
          </div>

          {/* CONFUSION MATRIX — full width */}
          <ConfusionMatrix
            tn={956}
            fp={68}
            fn={166}
            tp={176}
            delay={0.9}
            className="order-2 lg:order-none lg:col-span-12 lg:row-start-2"
          />
        </div>

        {/* case outcome strip */}
        <Reveal delay={0.1} className="mt-16">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border-t border-l border-black/10 sm:grid-cols-4 sm:divide-y-0">
            {OUTCOMES.map((o) => (
              <div key={o.label} className="border-r border-b border-black/10 p-5 sm:p-6">
                <p className="text-ink font-mono text-2xl font-bold sm:text-3xl">{o.value}</p>
                <p className="mt-1 text-xs tracking-[0.04em] text-black/50 uppercase">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <OutcomeInsight
          sentence="Calibration turned a high-precision, low-recall system into a more balanced monitoring workflow."
          comparisonBefore="Threshold 5.0 → 81.1% precision / 28.9% recall"
          comparisonAfter="Threshold 3.0 → 72.1% precision / 51.5% recall"
          delay={0.1}
          className="mt-16 border-t border-black/10 pt-14"
        />
      </div>
    </section>
  );
}
