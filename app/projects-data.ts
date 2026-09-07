export type CaseFile = {
  id: string;
  title: string;
  tag: string;
  tools: string[];
  note: string;
  href: string;
};

export const caseFiles: CaseFile[] = [
  {
    id: "001",
    title: "Transaction Behaviour Analysis",
    tag: "Fraud Analytics",
    tools: ["Python", "Pandas", "SQL"],
    note: "Pattern detected in high-risk behaviour.",
    href: "/projects/aml-transaction-monitoring",
  },
  {
    id: "002",
    title: "Streaming Revenue Dashboard",
    tag: "Data Product",
    tools: ["JavaScript", "React", "APIs"],
    note: "Turning complexity into clearer decisions.",
    href: "#",
  },
  {
    id: "003",
    title: "Market & Performance Reporting",
    tag: "Business Analytics",
    tools: ["Reporting", "Forecasting", "KPI Analysis"],
    note: "Evidence gathered from data and business context.",
    href: "#",
  },
];
