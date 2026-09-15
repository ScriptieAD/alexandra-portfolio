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

export type Evidence = StatsEvidence | ChartEvidence | NetworkEvidence;

export type CaseFile = {
  id: string;
  category: string;
  title: string;
  tag: string;
  summary: string;
  href: string;
  evidence: Evidence;
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
      kind: "stats",
      items: [
        { label: "Alerts", value: "723" },
        { label: "High-Risk Overlap", value: "613" },
        { label: "Rules", value: "2" },
      ],
    },
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
  },
];
