"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Paperclip } from "lucide-react";
import NetworkDiagram, { type NetworkEdge, type NetworkNode } from "./NetworkDiagram";
import EvidenceTag from "./EvidenceTag";

const NODES: NetworkNode[] = [
  { id: "a", x: 18, y: 26, role: "muted" },
  { id: "b", x: 12, y: 64, role: "muted" },
  { id: "c", x: 22, y: 104, role: "muted" },
  { id: "d", x: 50, y: 16, role: "muted" },
  { id: "hub1", x: 76, y: 64, role: "highlight" },
  { id: "hub2", x: 150, y: 78, role: "highlight" },
  { id: "mid", x: 118, y: 34, role: "default" },
  { id: "f", x: 186, y: 48, role: "muted" },
  { id: "g", x: 182, y: 114, role: "muted" },
];

const EDGES: NetworkEdge[] = [
  { from: "a", to: "hub1" },
  { from: "b", to: "hub1" },
  { from: "c", to: "hub1" },
  { from: "d", to: "hub1" },
  { from: "hub1", to: "hub2", highlighted: true },
  { from: "hub2", to: "mid" },
  { from: "hub2", to: "f" },
  { from: "hub2", to: "g" },
];

/** "36 Inbound Counterparties" -> { value: "36", label: "Inbound Counterparties" } */
function splitMetric(metric: string): { value: string; label: string } {
  const match = metric.match(/^([\d,]+(?:\s*\/\s*[\d,]+)?)\s+(.*)$/);
  if (!match) return { value: "", label: metric };
  return { value: match[1], label: match[2] };
}

export default function NetworkInvestigationBoard({
  labels,
  metrics,
  active,
}: {
  labels: string[];
  metrics: string[];
  active: boolean;
}) {
  const [tagA, , , tagD] = labels;

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <Image
        aria-hidden="true"
        src="/projects/aml-transaction-monitoring/dossier/coffee-stain.png"
        alt=""
        width={1254}
        height={1254}
        className="pointer-events-none absolute -bottom-8 -left-10 h-[220px] w-[220px] opacity-40 mix-blend-multiply"
      />

      <div
        aria-hidden="true"
        className="bg-manila/50 shadow-paper-xs absolute top-3 -left-3 h-[92%] w-[96%] rotate-2 rounded-[2px]"
      />

      <div className="bg-paper-card relative -rotate-1 rounded-[2px] px-6 pt-7 pb-6 drop-shadow-[0_16px_28px_rgba(64,45,35,0.16)]">
        <Paperclip
          aria-hidden="true"
          className="text-black/25 absolute -top-3 left-8 h-6 w-6 -rotate-12"
          strokeWidth={1.5}
        />

        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-5 w-5"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.12))",
          }}
        />

        <p className="font-mono text-[9px] tracking-[0.16em] text-black/40 uppercase">
          Network trace
        </p>

        <div className="relative mt-2">
          <NetworkDiagram
            nodes={NODES}
            edges={EDGES}
            viewBox="0 0 200 130"
            ariaLabel="Account transaction network with a collection hub, flow and dispersion pattern"
            className="h-auto w-full"
          />

          <svg
            viewBox="0 0 200 130"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <g fill="none" stroke="#8f2138" strokeOpacity={0.55} strokeWidth={1.2} strokeLinecap="round">
              <ellipse cx={76} cy={64} rx={16} ry={13} transform="rotate(-6 76 64)" />
              <ellipse cx={77.5} cy={62.5} rx={14.5} ry={14} transform="rotate(9 77.5 62.5)" />
              <ellipse cx={150} cy={78} rx={18} ry={14} transform="rotate(-4 150 78)" />
              <ellipse cx={151.5} cy={76.5} rx={16.5} ry={15.5} transform="rotate(7 151.5 76.5)" />
            </g>

            <path
              d="M184,106 Q169,97 160,86"
              fill="none"
              stroke="#8f2138"
              strokeOpacity={0.6}
              strokeWidth={1.2}
              strokeLinecap="round"
            />
            <path
              d="M160,86 L165,89 M160,86 L163,80"
              fill="none"
              stroke="#8f2138"
              strokeOpacity={0.6}
              strokeWidth={1.2}
              strokeLinecap="round"
            />

            <path
              d="M66,60 Q113,92 160,82"
              fill="none"
              stroke="#7a1f30"
              strokeOpacity={0.5}
              strokeWidth={0.9}
            />
            <circle cx={66} cy={60} r={1.6} fill="#7a1f30" fillOpacity={0.65} />
            <circle cx={160} cy={82} r={1.6} fill="#7a1f30" fillOpacity={0.65} />
          </svg>
        </div>

        {tagA && (
          <EvidenceTag rotate={-6} className="absolute -top-3 -left-3">
            {tagA}
          </EvidenceTag>
        )}
        {tagD && (
          <EvidenceTag rotate={5} tone="muted" className="absolute -top-3 -right-3">
            {tagD}
          </EvidenceTag>
        )}
      </div>

      <div className="absolute -bottom-6 -left-5 w-[44%] -rotate-6">
        <span
          aria-hidden="true"
          className="absolute -top-2 left-1/3 z-10 h-4 w-8 -rotate-3 rounded-[2px] bg-pink-300/70"
        />
        <div className="bg-paper-card relative rounded-[2px] border border-black/10 px-3 py-3 shadow-[0_10px_18px_rgba(64,45,35,0.18)]">
          {metrics.slice(0, 3).map((m) => {
            const { value, label } = splitMetric(m);
            return (
              <p key={m} className="font-mono text-[9px] leading-snug text-black/70 uppercase">
                <span className="text-burgundy font-bold">{value}</span> {label}
              </p>
            );
          })}
        </div>
      </div>

      <p
        aria-hidden="true"
        className="font-hand text-burgundy/55 absolute top-1/2 -right-1 hidden max-w-[110px] -translate-y-1/2 rotate-2 text-lg leading-snug sm:block"
      >
        Follow the money.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 1.35, rotate: -20 }}
        animate={
          active
            ? { opacity: 1, scale: 1, rotate: -9 }
            : { opacity: 0, scale: 1.35, rotate: -20 }
        }
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
        className="absolute -right-2 -bottom-11 w-[34%] mix-blend-multiply"
      >
        <Image
          src="/projects/aml-transaction-monitoring/dossier/evidence-stamp.png"
          alt=""
          width={2172}
          height={724}
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
