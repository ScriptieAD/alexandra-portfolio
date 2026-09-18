export type StatsEvidence = {
  kind: "stats";
  items: { label: string; value: string }[];
};

export type ChartEvidence = {
  kind: "chart";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type NetworkEvidence = {
  kind: "network";
  labels: string[];
};

/** A layered evidence-board composition built from real prop photography. */
export type DossierEvidence = {
  kind: "dossier";
  folder: string;
  note: string;
  photo: string;
  stamp: string;
  paper: string;
  alt: string;
};

export type Evidence = StatsEvidence | ChartEvidence | NetworkEvidence | DossierEvidence;

export type CaseFile = {
  id: string;
  category: string;
  title: string;
  tag: string;
  summary: string;
  href: string;
  evidence: Evidence;
  /** 2–3 headline figures already established on the project's own page. */
  metrics: string[];
  /** Methodology / tech stack, already shown elsewhere for this project. */
  tags: string[];
  /** Short handwritten-style investigator's note, not a data point. */
  note?: string;
  /** Optional short supporting line shown beside the CTA. */
  microcopy?: string;
  /** The one case the homepage should visually foreground. */
  featured?: boolean;
};

export const caseFiles: CaseFile[] = [
  {
    id: "001",
    category: "Transaction Monitoring",
    title: "Behavioural AML Detection",
    tag: "50K Transactions · 2.5K Customers · Python / Pandas",
    summary:
      "Behavioural profiling, threshold calibration, detection rules and case investigation.",
    href: "/projects/aml-transaction-monitoring",
    evidence: {
      kind: "dossier",
      folder: "/projects/aml-transaction-monitoring/dossier/dossier-folder.png",
      note: "/projects/aml-transaction-monitoring/dossier/alert-note.png",
      photo: "/projects/aml-transaction-monitoring/dossier/evidence-photo.png",
      stamp: "/projects/aml-transaction-monitoring/dossier/evidence-stamp.png",
      paper: "/projects/aml-transaction-monitoring/dossier/grid-paper.png",
      alt: "Case file AML-2024-017 with an alert log, investigation photo and evidence stamp",
    },
    metrics: [
      "50K Transactions",
      "2.5K Customers",
      "2,007 Alerts",
      "1,366 Cases",
      "3 Detection Rules",
    ],
    tags: ["Python", "Pandas", "Behavioural Detection", "Threshold Calibration"],
    note: "Flagged by behaviour, not by guesswork.",
    microcopy: "Real data. Real patterns. A safer financial system.",
    featured: true,
  },
  {
    id: "002",
    category: "Network Analysis",
    title: "AML Network & Flow Analysis",
    tag: "Graph Analysis · NetworkX · Flow Detection",
    summary:
      "Fan-in/fan-out, rapid pass-through, circular flows and network risk scoring.",
    href: "/projects/aml-network-analysis",
    evidence: {
      kind: "network",
      labels: ["FAN-IN", "FAN-OUT", "FLOW", "NETWORK"],
    },
    metrics: ["36 Inbound Counterparties", "28 Outbound Counterparties", "7 / 7 Risk Score"],
    tags: ["NetworkX", "Graph Analysis", "Flow Detection"],
    note: "Money rarely moves in straight lines.",
  },
  {
    id: "003",
    category: "Quantitative Research",
    title: "MANA Market Dynamics",
    tag: "ARIMA · GARCH · Time Series",
    summary: "Market modelling, volatility analysis and forecasting.",
    href: "/projects/metaverse-economy-mana-forecasting",
    evidence: {
      kind: "chart",
      src: "/projects/metaverse-mana/mana-price-history.png",
      width: 611,
      height: 385,
      alt: "MANA price evolution",
    },
    metrics: ["ARIMA(2,0,2) Model", "GARCH Volatility", "Bachelor Thesis"],
    tags: ["R", "ARIMA", "GARCH"],
    note: "Volatility leaves its own fingerprints.",
  },
];
