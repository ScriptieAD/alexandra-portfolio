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

export type Evidence = StatsEvidence | ChartEvidence;

export type CaseFile = {
  id: string;
  title: string;
  tag: string;
  tools: string[];
  note: string;
  href: string;
  evidence: Evidence;
};

export const caseFiles: CaseFile[] = [
  {
    id: "001",
    title: "Transaction Behaviour Analysis",
    tag: "Fraud Analytics",
    tools: ["Python", "Pandas", "SQL"],
    note: "Pattern detected in high-risk behaviour.",
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
    title: "Metaverse Economy & Financial Risk",
    tag: "Crypto Forecasting · Time Series · Virtual Economies",
    tools: ["R", "ARIMA", "GARCH", "Time Series"],
    note: "The forecast held. The variance — and the oversight — didn't.",
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
