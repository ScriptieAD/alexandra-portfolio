export type Highlight = {
    title: string;
    details: string[];
};

export type Experience = {
    slug: string;
    period: string;
    company: string;
    role: string;
    description: string;
    longDescription: string;
    highlights: Highlight[];
    current: boolean;
};

export const experiences: Experience[] = [
    {
        slug: "global-records",
        period: "2024 — Present",
        company: "Global Records",
        role: "Data & Analytics",
        description:
            "Financial and market analysis, automated reporting, APIs and internal analytical tools built around real business questions.",
        longDescription:
            `Working at Global Records has been one of the most rewarding experiences of my career, giving me the opportunity to combine two areas I genuinely enjoy: technology and creativity. Over time, I developed my own approach to this intersection, something I like to call "Artech", where art meets technology.

Being part of such a creative and constantly evolving industry has taught me to grow alongside it, stay adaptable, and continuously look for smarter ways of working.

Like any fast-paced business, the music industry comes with its own challenges. It often requires thinking outside the box, finding the fastest and most effective solution to a problem, and constantly optimizing processes and workflows. For me, technology is not just about building tools, it is about making things work better, supporting the business, and ultimately creating more value for both the company and its clients.`,
        highlights: [
            {
                title: "Used Python to clean, transform, and process data from financial reports",
                details: [
                    "Built ETL workflows for recurring datasets",
                    "Used Pandas for data cleaning and transformation",
                    "Standardized data coming from multiple sources",
                    "Performed validation before reporting",
                ],
            },
            {
                title: "Automated recurring financial and market reports",
                details: [
                    "Automated reporting workflows using Google Apps Script",
                    "Connected Google Sheets with external APIs",
                    "Reduced repetitive manual reporting",
                    "Built reusable reporting pipelines",
                ],
            },
            {
                title: "Designed and built internal APIs to connect analytical tools with business systems",
                details: [
                    "Worked with the YouTube API and other external data sources",
                    "Automated recurring data retrieval",
                    "Structured API data for dashboards and reporting",
                    "Connected analytical tools with internal workflows",
                ],
            },
            {
                title: "Partnered with stakeholders to translate business questions into data solutions",
                details: [
                    "Ran discovery sessions to scope open-ended business questions",
                    "Translated requirements into concrete data models",
                    "Presented findings back in plain, actionable terms",
                    "Iterated on solutions based on stakeholder feedback",
                ],
            },
            {
                title: " Designed and built a Supabase database for music catalog management",
                details: ["Designed relational tables and data structures for music catalog information",
                    "Configured Storage Buckets for file and asset management",
                    "Implemented Row Level Security policies for secure data access",
                    "Connected Supabase to internal tools using APIs",
                    "Continuously improved the database architecture as project requirements evolved"


                ]
            }
        ],
        current: true,
    },
    {
        slug: "business-analyst",
        period: "Previous",
        company: "Business Analyst",
        role: "Software & Public Systems",
        description:
            "Testing applications, writing test cases, validating features and translating business needs into technical requirements.",
        longDescription:
            "This role was where I first learned to think in requirements, sitting between the people who needed a system to work and the people building it. I spent my days testing software for public-facing systems, writing structured test cases, and making sure new features actually solved the problem they were meant to.",
        highlights: [
            {
                title: "Wrote and executed test cases across multiple releases of public-sector software",
                details: [
                    "Designed structured test cases from functional requirements",
                    "Ran regression testing ahead of each release",
                    "Logged results and tracked coverage across releases",
                    "Flagged edge cases before they reached production",
                ],
            },
            {
                title: "Documented and prioritised bugs in close collaboration with development teams",
                details: [
                    "Triaged incoming issues by severity and impact",
                    "Wrote clear reproduction steps for developers",
                    "Followed up on fixes through to verification",
                    "Kept a shared bug log up to date across sprints",
                ],
            },
            {
                title: "Translated business requirements into technical specifications developers could act on",
                details: [
                    "Sat between business stakeholders and the dev team",
                    "Broke down high-level requests into concrete specs",
                    "Clarified edge cases before development started",
                    "Reviewed delivered features against original requirements",
                ],
            },
        ],
        current: false,
    },
    {
        slug: "alpha-bank",
        period: "Previous",
        company: "Alpha Bank",
        role: "Digital Channels",
        description:
            "Financial reporting, digital banking operations, issue monitoring and collaboration with project and business teams.",
        longDescription:
            "My time in Digital Channels at Alpha Bank was my introduction to how a large financial institution actually runs day to day. I worked on financial reporting and kept an eye on digital banking operations, flagging and following up on issues before they became bigger problems, while working closely with project and business teams to keep everyone aligned.",
        highlights: [
            {
                title: "Produced recurring financial reports used by project and business teams",
                details: [
                    "Consolidated data from multiple internal systems",
                    "Built recurring report templates for stakeholders",
                    "Checked figures for accuracy before distribution",
                    "Delivered reports on a fixed reporting cadence",
                ],
            },
            {
                title: "Monitored digital banking channels and escalated operational issues",
                details: [
                    "Watched digital channel performance day to day",
                    "Flagged anomalies and outages as they appeared",
                    "Escalated incidents to the right technical teams",
                    "Followed issues through to resolution",
                ],
            },
            {
                title: "Acted as a bridge between technical teams and business stakeholders on ongoing projects",
                details: [
                    "Translated technical updates into business language",
                    "Coordinated timelines across teams",
                    "Kept stakeholders aligned on project status",
                    "Surfaced risks early to avoid delays",
                ],
            },
        ],
        current: false,
    },
];
