"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export type CaseMetrics = {
  incomingCounterparties?: number;
  outgoingCounterparties?: number;
  incomingVolume?: number;
  outgoingVolume?: number;
  rapidPassThroughEvents?: number;
  fanInScore?: number;
  fanOutScore?: number;
  betweennessCentrality?: number;
  community?: string;
  circularFlowDetected?: boolean;
  riskScore?: number;
  riskClassification?: string;
};

type RiskAccent = "none" | "low" | "medium" | "high" | "critical";

const ACCENT_TEXT: Record<RiskAccent, string> = {
  none: "text-black/45",
  low: "text-black/60",
  medium: "text-ink",
  high: "text-burgundy",
  critical: "text-burgundy",
};

const ACCENT_BORDER: Record<RiskAccent, string> = {
  none: "border-black/20",
  low: "border-black/30",
  medium: "border-burgundy/35",
  high: "border-burgundy/60",
  critical: "border-burgundy",
};

function accentFromClassification(label?: string): RiskAccent {
  const normalized = label?.toLowerCase() ?? "";
  if (normalized.includes("critical")) return "critical";
  if (normalized.includes("high")) return "high";
  if (normalized.includes("medium")) return "medium";
  if (normalized.includes("low")) return "low";
  return "none";
}

const currencyFmt = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function fadeUpVariant(delay: number, distance = 16) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function StageTag({ children }: { children: string }) {
  return (
    <p className="text-burgundy font-mono text-[11px] font-bold tracking-[0.26em] uppercase">
      {children}
    </p>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <p className="text-ink font-mono text-3xl leading-none font-bold sm:text-[2.25rem]">
        {value}
      </p>
      <p className="mt-2 max-w-[18ch] text-xs leading-snug tracking-[0.04em] text-black/50 uppercase">
        {label}
      </p>
    </div>
  );
}

function buildInterpretation(m: CaseMetrics): string | null {
  const sentences: string[] = [];

  if (m.incomingCounterparties !== undefined && m.outgoingCounterparties !== undefined) {
    if (m.outgoingCounterparties > m.incomingCounterparties) {
      sentences.push(
        `The account fans out to more counterparties (${m.outgoingCounterparties}) than it receives from (${m.incomingCounterparties}), consistent with a distribution role.`,
      );
    } else if (m.incomingCounterparties > m.outgoingCounterparties) {
      sentences.push(
        `The account collects from more counterparties (${m.incomingCounterparties}) than it pays out to (${m.outgoingCounterparties}), consistent with a collection role.`,
      );
    }
  }

  if (m.rapidPassThroughEvents !== undefined && m.rapidPassThroughEvents > 0) {
    sentences.push(
      `${m.rapidPassThroughEvents} rapid pass-through event${
        m.rapidPassThroughEvents === 1 ? "" : "s"
      } indicate funds moved on with minimal dwell time.`,
    );
  }

  if (m.circularFlowDetected) {
    sentences.push(
      "A circular flow pattern was detected in the surrounding network, a stronger structuring indicator.",
    );
  }

  if (m.betweennessCentrality !== undefined) {
    sentences.push(
      `A betweenness centrality of ${m.betweennessCentrality} places the account structurally between other parts of the network.`,
    );
  }

  if (m.riskClassification) {
    sentences.push(
      `Combined, this places the account in the ${m.riskClassification.toLowerCase()} priority band.`,
    );
  }

  if (sentences.length === 0) return null;
  return sentences.join(" ");
}

/**
 * A one-sentence, network-diagram-scoped caption in the shape
 * "Network evidence shows a highly connected account interacting with
 * [count] counterparties, with [finding] indicating elevated intermediary /
 * flow risk." Only ever states facts present in `m` — returns null rather
 * than a placeholder when there isn't enough to say anything.
 */
export function buildNetworkEvidenceCaption(m: CaseMetrics): string | null {
  const totalCounterparties =
    m.incomingCounterparties !== undefined && m.outgoingCounterparties !== undefined
      ? m.incomingCounterparties + m.outgoingCounterparties
      : (m.incomingCounterparties ?? m.outgoingCounterparties);

  if (totalCounterparties === undefined) return null;

  const counterpartyPhrase = `${totalCounterparties} counterpart${totalCounterparties === 1 ? "y" : "ies"}`;

  let finding: string | null = null;
  if (m.circularFlowDetected) {
    finding = "a circular flow pattern in its surrounding network";
  } else if (m.rapidPassThroughEvents !== undefined && m.rapidPassThroughEvents > 0) {
    finding = `${m.rapidPassThroughEvents} rapid pass-through event${
      m.rapidPassThroughEvents === 1 ? "" : "s"
    }`;
  } else if (m.betweennessCentrality !== undefined) {
    finding = `a betweenness centrality of ${m.betweennessCentrality}`;
  } else if (m.riskClassification) {
    finding = `a ${m.riskClassification.toLowerCase()} risk classification`;
  }

  if (!finding) {
    return `Network evidence shows an account interacting with ${counterpartyPhrase} in this view.`;
  }

  return `Network evidence shows a highly connected account interacting with ${counterpartyPhrase}, with ${finding} indicating elevated intermediary / flow risk.`;
}

export default function CaseInvestigationSummary({
  metrics,
  maxRiskScore,
  delay = 0,
  className = "",
}: {
  metrics: CaseMetrics;
  maxRiskScore?: number;
  delay?: number;
  className?: string;
}) {
  const {
    incomingCounterparties,
    outgoingCounterparties,
    incomingVolume,
    outgoingVolume,
    rapidPassThroughEvents,
    fanInScore,
    fanOutScore,
    betweennessCentrality,
    community,
    circularFlowDetected,
    riskScore,
    riskClassification,
  } = metrics;

  const hasNetworkProfile =
    incomingCounterparties !== undefined ||
    outgoingCounterparties !== undefined ||
    fanInScore !== undefined ||
    fanOutScore !== undefined;
  const hasFlowBehaviour =
    incomingVolume !== undefined ||
    outgoingVolume !== undefined ||
    rapidPassThroughEvents !== undefined;
  const hasNetworkPosition =
    betweennessCentrality !== undefined || !!community || circularFlowDetected !== undefined;
  const hasRiskAssessment = riskScore !== undefined || !!riskClassification;
  const hasAnyMetric = hasNetworkProfile || hasFlowBehaviour || hasNetworkPosition || hasRiskAssessment;

  const interpretation = buildInterpretation(metrics);
  const accent = accentFromClassification(riskClassification);

  if (!hasAnyMetric) {
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant(delay)}
        className={`bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 px-6 py-5 ${className}`}
      >
        <p className="text-[13px] leading-[1.7] text-black/55 italic">
          Case metrics for this account are still being finalised. The
          evaluation framework below is what this investigation applies once
          they are.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
        {hasNetworkProfile && (
          <motion.div variants={fadeUpVariant(delay)}>
            <StageTag>Network profile</StageTag>
            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-6">
              {incomingCounterparties !== undefined && (
                <Stat value={incomingCounterparties} label="Incoming counterparties" />
              )}
              {outgoingCounterparties !== undefined && (
                <Stat value={outgoingCounterparties} label="Outgoing counterparties" />
              )}
              {fanInScore !== undefined && <Stat value={fanInScore} label="Fan-in score" />}
              {fanOutScore !== undefined && <Stat value={fanOutScore} label="Fan-out score" />}
            </div>
          </motion.div>
        )}

        {hasFlowBehaviour && (
          <motion.div variants={fadeUpVariant(delay + 0.08)}>
            <StageTag>Flow behaviour</StageTag>
            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-6">
              {incomingVolume !== undefined && (
                <Stat value={currencyFmt(incomingVolume)} label="Inbound volume" />
              )}
              {outgoingVolume !== undefined && (
                <Stat value={currencyFmt(outgoingVolume)} label="Outbound volume" />
              )}
              {rapidPassThroughEvents !== undefined && (
                <Stat value={rapidPassThroughEvents} label="Rapid pass-through events" />
              )}
            </div>
          </motion.div>
        )}

        {hasNetworkPosition && (
          <motion.div variants={fadeUpVariant(delay + 0.16)}>
            <StageTag>Network position</StageTag>
            <dl className="mt-4 space-y-2.5">
              {betweennessCentrality !== undefined && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                    Betweenness
                  </dt>
                  <dd className="text-ink font-mono text-sm font-semibold">
                    {betweennessCentrality}
                  </dd>
                </div>
              )}
              {community && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                    Community
                  </dt>
                  <dd className="text-ink font-mono text-sm font-semibold">{community}</dd>
                </div>
              )}
              {circularFlowDetected !== undefined && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-black/40 uppercase">
                    Circular flow
                  </dt>
                  <dd className="text-ink font-mono text-sm font-semibold">
                    {circularFlowDetected ? "Detected" : "Not detected"}
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}

        {hasRiskAssessment && (
          <motion.div variants={fadeUpVariant(delay + 0.24)}>
            <StageTag>Risk assessment</StageTag>
            <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
              {riskScore !== undefined && (
                <p className={`font-mono text-4xl leading-none font-bold ${ACCENT_TEXT[accent]}`}>
                  {riskScore}
                  {maxRiskScore !== undefined && (
                    <span className="text-black/30 text-xl"> / {maxRiskScore}</span>
                  )}
                </p>
              )}
              {riskClassification && (
                <span
                  className={`shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.16em] uppercase ${ACCENT_TEXT[accent]} ${ACCENT_BORDER[accent]}`}
                >
                  {riskClassification}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {interpretation && (
        <motion.div
          variants={fadeUpVariant(delay + 0.32)}
          className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-10 max-w-2xl px-6 py-5"
        >
          <p className="text-burgundy/70 mb-2 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
            Analyst interpretation
          </p>
          <p className="text-[14px] leading-[1.7] text-black/65">{interpretation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
