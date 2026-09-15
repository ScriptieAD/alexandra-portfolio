"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../../components/Reveal";
import ProjectHero from "../../components/ProjectHero";
import CaseMetadata from "../../components/CaseMetadata";
import CaseTab from "../../components/CaseTab";
import EvidenceTag from "../../components/EvidenceTag";
import MarginNote from "../../components/MarginNote";
import InvestigationAnnotation from "../../components/InvestigationAnnotation";
import FlowConnector from "../../components/FlowConnector";
import NetworkDiagram, { type NetworkNode, type NetworkEdge } from "../../components/NetworkDiagram";
import FanFlowDiagram from "../../components/FanFlowDiagram";
import TypologyCard from "../../components/TypologyCard";
import RiskScoreMatrix from "../../components/RiskScoreMatrix";
import CaseInvestigationSummary, {
  buildNetworkEvidenceCaption,
  type CaseMetrics,
} from "../../components/CaseInvestigationSummary";
import NetworkLegend, { NETWORK_LEGEND_SWATCH } from "../../components/NetworkLegend";
import ProjectCapabilities from "../../components/ProjectCapabilities";
import CaseClosed from "../../components/CaseClosed";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-paper relative border-t border-black/10 py-24 sm:py-28 lg:py-32 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">{children}</div>
    </section>
  );
}

function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
      {index} — {children}
    </p>
  );
}

/* ---------------------------------------------------------------------- */
/* Section 02 — the network build diagram                                 */
/* ---------------------------------------------------------------------- */

const BUILD_NODES: NetworkNode[] = [
  { id: "C00124", x: 22, y: 66, label: "C00124", role: "default" },
  { id: "C01016", x: 104, y: 66, label: "C01016", role: "highlight" },
  { id: "C00821", x: 186, y: 26, label: "C00821", role: "default" },
  { id: "C01420", x: 186, y: 106, label: "C01420", role: "default" },
];

const BUILD_EDGES: NetworkEdge[] = [
  { from: "C00124", to: "C01016", highlighted: true },
  { from: "C01016", to: "C00821", highlighted: true },
  { from: "C01016", to: "C01420", highlighted: true },
];

const EDGE_ATTRIBUTES = [
  "Transaction count",
  "Total volume",
  "Average amount",
  "First transaction",
  "Last transaction",
];

/* ---------------------------------------------------------------------- */
/* Section 06 — graph analysis diagram (community + bridge)               */
/* ---------------------------------------------------------------------- */

const GRAPH_NODES: NetworkNode[] = [
  { id: "a1", x: 20, y: 26, role: "muted" },
  { id: "a2", x: 16, y: 66, role: "muted" },
  { id: "a3", x: 42, y: 98, role: "muted" },
  { id: "br", x: 108, y: 62, label: "Bridge account", role: "highlight" },
  { id: "b1", x: 172, y: 20, role: "muted" },
  { id: "b2", x: 192, y: 62, role: "muted" },
  { id: "b3", x: 168, y: 102, role: "muted" },
];

const GRAPH_EDGES: NetworkEdge[] = [
  { from: "a1", to: "a2" },
  { from: "a2", to: "a3" },
  { from: "a2", to: "br", highlighted: true },
  { from: "br", to: "b2", highlighted: true },
  { from: "b1", to: "b2" },
  { from: "b2", to: "b3" },
];

/* ---------------------------------------------------------------------- */
/* Section 07 — circular flow diagrams                                    */
/* ---------------------------------------------------------------------- */

const TWO_NODE_NODES: NetworkNode[] = [
  { id: "A", x: 55, y: 65, label: "A", role: "highlight" },
  { id: "B", x: 145, y: 65, label: "B", role: "highlight" },
];

const TWO_NODE_EDGES: NetworkEdge[] = [
  { from: "A", to: "B", highlighted: true, curve: 16 },
  { from: "B", to: "A", highlighted: true, curve: 16 },
];

const THREE_NODE_NODES: NetworkNode[] = [
  { id: "A", x: 100, y: 22, label: "A", role: "highlight" },
  { id: "B", x: 172, y: 104, label: "B", role: "highlight" },
  { id: "C", x: 28, y: 104, label: "C", role: "highlight" },
];

const THREE_NODE_EDGES: NetworkEdge[] = [
  { from: "A", to: "B", highlighted: true, curve: 8 },
  { from: "B", to: "C", highlighted: true, curve: 8 },
  { from: "C", to: "A", highlighted: true, curve: 8 },
];

/* ---------------------------------------------------------------------- */
/* Section 09 — C01016 ego network                                        */
/* ---------------------------------------------------------------------- */

const EGO_NODES: NetworkNode[] = [
  { id: "flag1", x: 68, y: 42, role: "highlight" },
  { id: "flag2", x: 218, y: 52, role: "highlight" },
  { id: "C01016", x: 143, y: 96, label: "C01016", role: "focus" },
  { id: "n1", x: 38, y: 118, role: "muted" },
  { id: "n2", x: 108, y: 152, role: "muted" },
  { id: "n3", x: 192, y: 148, role: "muted" },
  { id: "n4", x: 232, y: 112, role: "muted" },
];

const EGO_EDGES: NetworkEdge[] = [
  { from: "flag1", to: "C01016", highlighted: true },
  { from: "C01016", to: "flag2", highlighted: true },
  { from: "n1", to: "C01016" },
  { from: "C01016", to: "n2" },
  { from: "n3", to: "C01016" },
  { from: "C01016", to: "n4" },
];

// Real, case-specific values for C01016 go here once pulled from the
// underlying analysis. Any field left as `undefined` is automatically
// omitted from the investigation summary below — never shown as 0 or a
// placeholder.
const CASE_C01016_METRICS: CaseMetrics = {
  incomingCounterparties: undefined, // e.g. 3
  outgoingCounterparties: undefined, // e.g. 9
  incomingVolume: undefined, // EUR, e.g. 42250.10
  outgoingVolume: undefined, // EUR
  rapidPassThroughEvents: undefined,
  fanInScore: undefined,
  fanOutScore: undefined,
  betweennessCentrality: undefined,
  community: undefined, // e.g. "Cluster 4"
  circularFlowDetected: undefined, // true | false
  riskScore: undefined, // out of CASE_C01016_RISK_MAX below
  riskClassification: undefined, // e.g. "Critical" — matches PRIORITY_BANDS labels
};

const INVESTIGATION_FRAMEWORK: { label: string; text: string }[] = [
  { label: "Incoming counterparties", text: "Unique accounts sending funds to the account." },
  { label: "Outgoing counterparties", text: "Unique accounts receiving funds from the account." },
  { label: "Incoming volume", text: "Total value of funds received." },
  { label: "Outgoing volume", text: "Total value of funds sent onward." },
  { label: "Overall flow ratio", text: "Outgoing volume relative to incoming volume." },
  { label: "Network risk score", text: "Combined score from the scoring framework above." },
  { label: "Network case type", text: "Typology classification — collection, hub, pass-through, and so on." },
  { label: "Betweenness centrality", text: "The account's position between other parts of the network." },
  { label: "Community membership", text: "The cluster the account belongs to, from community detection." },
  { label: "Triggered network rules", text: "Which network detection rules the account crossed." },
];

/* ---------------------------------------------------------------------- */
/* Section 04 — rapid pass-through flow                                   */
/* ---------------------------------------------------------------------- */

function FlowNode({ tone, label }: { tone: "paper" | "burgundy"; label: string }) {
  return (
    <div
      className={`shadow-paper-xs w-full max-w-[220px] rounded-[2px] px-5 py-3 text-center ${
        tone === "burgundy" ? "bg-burgundy" : "bg-paper-card border border-black/10"
      }`}
    >
      <p
        className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
          tone === "burgundy" ? "text-white/90" : "text-black/50"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function FlowStep({ amount }: { amount: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <div className="h-8">
        <FlowConnector orientation="vertical" emphasized />
      </div>
      <span className="text-burgundy font-mono text-xs font-bold">↓ {amount}</span>
    </div>
  );
}

function PassThroughFlow() {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-center">
      <FlowNode tone="paper" label="Account A" />
      <FlowStep amount="€9,500" />
      <FlowNode tone="burgundy" label="Intermediary" />
      <FlowStep amount="€9,200" />
      <FlowNode tone="paper" label="Account B" />

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <EvidenceTag tone="muted">TIME · 2.4H</EvidenceTag>
        <EvidenceTag>FLOW RATIO · 96.8%</EvidenceTag>
      </div>

      <p className="font-hand text-burgundy/70 mt-5 -rotate-2 text-lg leading-none">
        potential pass-through behaviour
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Section 05 — typologies                                                */
/* ---------------------------------------------------------------------- */

const TYPOLOGIES = [
  {
    code: "TYPE_01",
    title: "COLLECTION ACCOUNT",
    criteria: "High fan-in",
    description: "Concentrates funds received from a wide, largely unrelated base of senders.",
    rotate: -1.4,
  },
  {
    code: "TYPE_02",
    title: "DISPERSION ACCOUNT",
    criteria: "High fan-out",
    description: "Distributes funds outward across a wide, largely unrelated base of receivers.",
    rotate: 1.1,
  },
  {
    code: "TYPE_03",
    title: "NETWORK HUB",
    criteria: "High fan-in + high fan-out",
    description: "Both concentrates and disperses funds — a structural chokepoint in the network.",
    rotate: -0.8,
    emphasized: true,
  },
  {
    code: "TYPE_04",
    title: "PASS-THROUGH / INTERMEDIARY",
    criteria: "Repeated rapid movement of similar amounts",
    description: "Receives and forwards comparable amounts in short succession, repeatedly.",
    rotate: 0.9,
  },
  {
    code: "TYPE_05",
    title: "HIGH-CONNECTIVITY PASS-THROUGH",
    criteria: "High fan-in + high fan-out + rapid flow",
    description: "Combines structural centrality with rapid pass-through behaviour — the highest-priority typology.",
    rotate: -1,
    emphasized: true,
  },
];

/* ---------------------------------------------------------------------- */
/* Section 08 — risk scoring                                               */
/* ---------------------------------------------------------------------- */

const SCORE_RULES = [
  { label: "High fan-in", points: 1 },
  { label: "High fan-out", points: 1 },
  { label: "Repeated rapid flow", points: 3 },
  { label: "High betweenness", points: 2 },
];

const CASE_C01016_RISK_MAX = SCORE_RULES.reduce((sum, rule) => sum + rule.points, 0);

const PRIORITY_BANDS = [
  { range: "0", label: "No Priority", accent: "none" as const },
  { range: "1", label: "Low", accent: "low" as const },
  { range: "2–3", label: "Medium", accent: "medium" as const },
  { range: "4–5", label: "High", accent: "high" as const },
  { range: "6+", label: "Critical", accent: "critical" as const },
];

/* ---------------------------------------------------------------------- */
/* Section 10 — validation glossary                                       */
/* ---------------------------------------------------------------------- */

const VALIDATION_TERMS = [
  { term: "True Positives", text: "Flagged accounts that were also labelled as involved in laundering." },
  { term: "False Positives", text: "Flagged accounts that were not labelled as suspicious." },
  { term: "False Negatives", text: "Labelled laundering accounts the network model did not flag." },
  { term: "Precision & Recall", text: "The trade-off between flagging accurately and flagging completely." },
];

export default function AmlNetworkAnalysisPage() {
  const networkEvidenceCaption = buildNetworkEvidenceCaption(CASE_C01016_METRICS);

  return (
    <main className="bg-paper min-h-screen overflow-x-hidden text-ink">
      <Link
        href="/#projects"
        className="bg-ivory/90 fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-black/60 uppercase backdrop-blur-md transition hover:border-burgundy/30 hover:text-burgundy"
      >
        ← Back
      </Link>

      <ProjectHero
        caseLabel="CASE 002"
        eyebrow="Financial Crime Analytics · Network Analysis"
        title="AML Network & Flow Analysis"
        subtitle="A transaction-network investigation that treats transactions as a directed graph — surfacing suspicious account relationships, concentration and dispersion patterns, rapid movement of funds, and potentially circular transaction flows."
        note="follow the connections, not just the transaction."
        tags={["Python", "Pandas", "NetworkX", "Matplotlib", "Graph Analysis"]}
        status="Case status: Investigated"
      />

      {/* 01 — CASE OVERVIEW */}
      <Section>
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="01">Case Overview</Eyebrow>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Following the Money Through the Network
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-[1.8] text-black/60">
                Traditional transaction monitoring evaluates individual
                transactions or customer behaviour. This project extends that
                analysis by treating transactions as a directed network,
                allowing suspicious relationships and the movement of funds
                between accounts to be investigated.
              </p>
              <p className="mt-5 max-w-xl text-base leading-[1.8] text-black/60">
                The objective was to identify accounts behaving as collection
                points, dispersion accounts, intermediaries or network hubs —
                without using the dataset&apos;s laundering labels to define
                the detection logic.
              </p>
            </Reveal>

            <InvestigationAnnotation className="mt-8" rotate={-2} delay={0.5}>
              the account, not just the transaction
            </InvestigationAnnotation>
          </div>

          <div className="mt-14 lg:col-span-5 lg:mt-0 lg:border-l lg:border-black/10 lg:pl-14">
            <Reveal delay={0.15}>
              <CaseTab tone="manila" onLoad>
                Case File / Network Analysis
              </CaseTab>
              <CaseMetadata
                className="mt-6"
                items={[
                  { label: "Case type", value: "Network & Flow Analysis" },
                  { label: "Data", value: "50,000 transactions · 2,500 customers" },
                  { label: "Method", value: "Graph-based behavioural detection" },
                  { label: "Tools", value: "Python · Pandas · NetworkX" },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02 — BUILDING THE TRANSACTION NETWORK */}
      <Section>
        <Reveal>
          <Eyebrow index="02">Building the Transaction Network</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Every account is a node. Every transaction, an edge.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <ul className="space-y-4 text-base leading-[1.75] text-black/60">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-burgundy/60 font-mono text-xs">01</span>
                  Each customer account becomes a node.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-burgundy/60 font-mono text-xs">02</span>
                  Each sender → receiver relationship becomes a directed edge.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                Edges were aggregated using
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {EDGE_ATTRIBUTES.map((attr, i) => (
                  <EvidenceTag key={attr} tone="muted" delay={0.05 * i}>
                    {attr}
                  </EvidenceTag>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-paper-card shadow-paper-sm border border-black/10 p-6 sm:p-8">
              <NetworkDiagram
                nodes={BUILD_NODES}
                edges={BUILD_EDGES}
                viewBox="0 0 208 132"
                ariaLabel="C00124 sends to C01016, which fans out to C00821 and C01420"
                className="h-auto w-full max-w-[420px]"
              />
              <p className="mt-4 border-t border-black/10 pt-4 text-center font-mono text-[11px] text-black/45">
                C00124 → C01016 → C00821 &nbsp;↘&nbsp; C01420
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — FAN-IN / FAN-OUT */}
      <Section>
        <Reveal>
          <Eyebrow index="03">Fan-In / Fan-Out</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Concentration, meet dispersion
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-16">
          <FanFlowDiagram
            variant="fan-in"
            title="FAN-IN"
            headline="MANY → ONE"
            metrics={["Unique senders", "Incoming transaction count", "Incoming volume"]}
            interpretation="Unusually high fan-in may indicate a collection or aggregation account."
            delay={0.1}
          />
          <FanFlowDiagram
            variant="fan-out"
            title="FAN-OUT"
            headline="ONE → MANY"
            metrics={["Unique receivers", "Outgoing transaction count", "Outgoing volume"]}
            interpretation="Unusually high fan-out may indicate dispersion of funds across multiple accounts."
            delay={0.2}
          />
        </div>

        <Reveal delay={0.1} className="mt-16 border-t border-black/10 pt-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Detection threshold
          </p>
          <p className="text-burgundy mt-3 font-mono text-5xl leading-none font-bold sm:text-6xl">
            28
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-black/55">
            unique counterparties — applied to both unique senders and unique
            receivers, per account.
          </p>
        </Reveal>
      </Section>

      {/* 04 — RAPID PASS-THROUGH FLOW */}
      <Section>
        <Reveal>
          <Eyebrow index="04">Rapid Pass-Through Flow</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Funds that don&apos;t stay long
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14">
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="max-w-md text-base leading-[1.8] text-black/60">
                The analysis searched for accounts that receive funds, send a
                similar amount shortly afterwards, and repeat this behaviour
                multiple times.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <dl className="divide-black/[0.08] border-black/[0.08] divide-y border-t font-mono text-[12px]">
                {[
                  ["Timing", "outgoing transaction within 6 hours"],
                  ["Amount match", "80% – 105% of incoming amount"],
                  ["Repetition", "minimum 4 events"],
                  ["Cluster window", "maximum 3-day span"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-8">
                    <dt className="text-black/40 uppercase tracking-[0.16em]">{label}</dt>
                    <dd className="text-black/70 sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <MarginNote className="mt-8" rotate={-2} delay={0.5}>
              in and out, before the trail goes cold
            </MarginNote>
          </div>

          <div className="mt-4 lg:col-span-6 lg:mt-0">
            <div className="bg-paper-card shadow-paper-sm border border-black/10 p-8 sm:p-10">
              <PassThroughFlow />
            </div>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-black/40 italic">
              Illustrative visualisation only — not a dataset finding.
            </p>
          </div>
        </div>
      </Section>

      {/* 05 — NETWORK TYPOLOGIES */}
      <Section>
        <Reveal>
          <Eyebrow index="05">Network Typologies</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Classifying the behaviour
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {TYPOLOGIES.map((typology, i) => (
            <TypologyCard
              key={typology.code}
              code={typology.code}
              title={typology.title}
              criteria={typology.criteria}
              description={typology.description}
              rotate={typology.rotate}
              emphasized={typology.emphasized}
              delay={i * 0.1}
              className={typology.emphasized ? "sm:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
      </Section>

      {/* 06 — GRAPH ANALYSIS */}
      <Section>
        <Reveal>
          <Eyebrow index="06">Graph Analysis</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Beyond simple aggregation
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <div className="lg:col-span-6">
            <dl className="divide-black/[0.08] border-black/[0.08] divide-y border-t">
              <Reveal delay={0.05}>
                <div className="py-6">
                  <dt className="font-mono text-xs font-bold tracking-[0.1em] text-black/70 uppercase">
                    Betweenness centrality
                  </dt>
                  <dd className="mt-2 max-w-md text-[14px] leading-[1.7] text-black/60">
                    Used to identify accounts positioned between different
                    parts of the transaction network.
                  </dd>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="py-6">
                  <dt className="font-mono text-xs font-bold tracking-[0.1em] text-black/70 uppercase">
                    Community detection
                  </dt>
                  <dd className="mt-2 max-w-md text-[14px] leading-[1.7] text-black/60">
                    Greedy modularity was used to identify clusters of
                    strongly connected accounts.
                  </dd>
                </div>
              </Reveal>
              <Reveal delay={0.19}>
                <div className="py-6">
                  <dt className="font-mono text-xs font-bold tracking-[0.1em] text-black/70 uppercase">
                    Directed graph
                  </dt>
                  <dd className="mt-2 max-w-md text-[14px] leading-[1.7] text-black/60">
                    The network was built using NetworkX as a directed graph,
                    with transaction volume and transaction count stored on
                    each edge.
                  </dd>
                </div>
              </Reveal>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-paper-card shadow-paper-sm border border-black/10 p-6 sm:p-8">
              <NetworkDiagram
                nodes={GRAPH_NODES}
                edges={GRAPH_EDGES}
                viewBox="0 0 208 122"
                ariaLabel="Two communities of accounts connected through a bridge account, used for betweenness and community detection"
                className="h-auto w-full max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 07 — CIRCULAR FLOW DETECTION */}
      <Section>
        <Reveal>
          <Eyebrow index="07">Circular Flow Detection</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            When money comes back around
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-16">
          <div className="border-t border-black/10 pt-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
              2-Node Return Flow
            </p>
            <NetworkDiagram
              nodes={TWO_NODE_NODES}
              edges={TWO_NODE_EDGES}
              viewBox="0 0 200 110"
              ariaLabel="Account A sends to B and B returns funds to A"
              className="mt-5 h-auto w-full max-w-[280px]"
            />
            <p className="mt-4 max-w-[32ch] text-[13px] leading-[1.7] text-black/60">
              Money returning within 24 hours, where the returned amount
              represented roughly 80–120% of the original.
            </p>
          </div>

          <div className="border-t border-black/10 pt-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
              3-Node Cycle
            </p>
            <NetworkDiagram
              nodes={THREE_NODE_NODES}
              edges={THREE_NODE_EDGES}
              viewBox="0 0 200 130"
              ariaLabel="Account A sends to B, B sends to C, and C sends back to A"
              className="mt-5 h-auto w-full max-w-[280px]"
            />
            <p className="mt-4 max-w-[32ch] text-[13px] leading-[1.7] text-black/60">
              Temporally ordered three-account cycles completing within 72
              hours, with each subsequent amount within 80–120% of the
              initial one.
            </p>
          </div>
        </div>

        <InvestigationAnnotation className="mt-14" rotate={-2} delay={0.2}>
          connectivity alone isn&apos;t evidence — timing and amount are
        </InvestigationAnnotation>
      </Section>

      {/* 08 — NETWORK RISK MODEL */}
      <Section>
        <Reveal>
          <Eyebrow index="08">Network Risk Model</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Scoring the behaviour, not just flagging it
          </h2>
        </Reveal>

        <RiskScoreMatrix
          rules={SCORE_RULES}
          bands={PRIORITY_BANDS}
          delay={0.1}
          className="mt-16 max-w-3xl"
        />
      </Section>

      {/* 09 — CASE INVESTIGATION: C01016 */}
      <Section>
        <Reveal>
          <Eyebrow index="09">Case Investigation</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Case #C01016
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <CaseTab tone="manila" onLoad className="mt-8">
            Investigation File / C01016
          </CaseTab>
        </Reveal>

        <CaseInvestigationSummary
          metrics={CASE_C01016_METRICS}
          maxRiskScore={CASE_C01016_RISK_MAX}
          delay={0.15}
          className="mt-10 max-w-4xl"
        />

        <div className="mt-16 border-t border-black/10 pt-12">
          <Reveal>
            <p className="font-mono text-[10px] font-bold tracking-[0.24em] text-black/40 uppercase">
              Full investigation framework
            </p>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14">
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <p className="max-w-md text-[15px] leading-[1.75] text-black/60">
                The summary above surfaces the headline figures for this
                case. The framework below is the full set of criteria the
                investigation evaluates for every flagged account.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {INVESTIGATION_FRAMEWORK.map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.04}>
                  <p className="font-mono text-xs font-bold tracking-tight text-black/75">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-black/55">
                    {item.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-paper-card shadow-paper-sm relative border border-black/10 p-6 sm:p-8">
              <div className="absolute -top-3.5 left-6 z-10">
                <CaseTab tone="paper" onLoad>
                  Exhibit / Ego Network
                </CaseTab>
              </div>

              <NetworkDiagram
                nodes={EGO_NODES}
                edges={EGO_EDGES}
                viewBox="0 0 260 172"
                ariaLabel="C01016 shown as the central account, connected to flagged and ordinary counterparties"
                className="h-auto w-full max-w-[420px]"
              />

              <NetworkLegend
                className="mt-6"
                items={[
                  { id: "focus", swatch: NETWORK_LEGEND_SWATCH.focus, label: "Investigated customer" },
                  { id: "flagged", swatch: NETWORK_LEGEND_SWATCH.flagged, label: "Flagged counterparty" },
                  { id: "other", swatch: NETWORK_LEGEND_SWATCH.other, label: "Other counterparty" },
                  { id: "direction", swatch: NETWORK_LEGEND_SWATCH.direction, label: "Transaction direction" },
                ]}
                notes={[
                  "Node size reflects the account's role in this view — the investigated customer is drawn largest.",
                  "Bolder edges mark the specific flow path under investigation, not transaction volume.",
                ]}
              />
            </div>

            {networkEvidenceCaption && (
              <p className="mt-4 max-w-md text-center text-[13px] leading-relaxed text-black/60">
                {networkEvidenceCaption}
              </p>
            )}

            <p className="mt-3 text-center text-[11px] leading-relaxed text-black/40 italic">
              Illustrative ego-network view — only the focus account and
              flagged counterparties are labelled, to avoid clutter.
            </p>
          </div>
        </div>
      </Section>

      {/* 10 — VALIDATION */}
      <Section>
        <Reveal>
          <Eyebrow index="10">Validation</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Checking the method against the answer key
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base leading-[1.8] text-black/60">
            The laundering labels supplied with the synthetic dataset were
            intentionally excluded from the network-risk detection logic.
            They were used only after the analysis was completed, to
            evaluate how well the methodology identified labelled suspicious
            activity.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALIDATION_TERMS.map((item, i) => (
            <Reveal key={item.term} delay={0.1 + i * 0.06}>
              <p className="font-mono text-xs font-bold tracking-[0.06em] text-black/75 uppercase">
                {item.term}
              </p>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/55">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-14">
          <div className="bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 max-w-2xl px-5 py-4">
            <p className="text-burgundy/70 mb-1.5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
              Methodology note
            </p>
            <p className="text-[13px] leading-[1.7] text-black/60 italic">
              This separation exists so that detection logic reflects
              genuine behavioural patterns, rather than being reverse-
              engineered from the answer key.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 11 — WHAT THIS INVESTIGATION DEMONSTRATES */}
      <ProjectCapabilities
        eyebrow="Capabilities"
        heading="What This Investigation Demonstrates"
        capabilities={[
          {
            label: "Transaction Network Analysis",
            description: "Moving beyond isolated transactions to analyse relationships between accounts.",
          },
          {
            label: "AML Typology Design",
            description: "Translating patterns such as collection, dispersion, pass-through and circular flow into detection logic.",
          },
          {
            label: "Graph Analytics",
            description: "Using directed networks, centrality and community detection to investigate financial flows.",
          },
          {
            label: "Detection Engineering",
            description: "Building thresholds, flags, scoring logic and prioritisation rather than simply visualising data.",
          },
          {
            label: "Analytical Validation",
            description: "Separating detection methodology from labelled ground truth and evaluating performance afterwards.",
          },
        ]}
        description="This project moves beyond isolated transaction analysis into network-based investigation — designing typologies, engineering detection logic, applying graph analytics and validating methodology against real-world evaluation concepts, all within a Financial Crime & AML context."
      />

      <CaseClosed
        caseLabel="Case 002 / Network Analytics Lab"
        statement={
          <>
            Built to trace connections.
            <br />
            Calibrated to prioritise the ones that matter.
          </>
        }
        subline="From a directed transaction graph to typology classification, risk scoring and validated network detection logic."
        stampCaseId="Case 002"
        stampStatus="Investigated"
        footerTitle="AML Network & Flow Analysis Engine"
        footerStack="Python · Pandas · NetworkX · Graph Analytics"
        nextCase={{
          title: "MANA Market Dynamics & Time-Series Forecasting",
          href: "/projects/metaverse-economy-mana-forecasting",
        }}
      />
    </main>
  );
}
