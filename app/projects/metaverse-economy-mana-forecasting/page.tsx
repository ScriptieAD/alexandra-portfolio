"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "../../components/Reveal";
import CaseTab from "../../components/CaseTab";
import PinnedNote from "../../components/PinnedNote";
import MarginNote from "../../components/MarginNote";
import BriefItem from "../../components/BriefItem";
import InvestigationAnnotation from "../../components/InvestigationAnnotation";
import InvestigationWorkflow from "../../components/InvestigationWorkflow";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TAGS = [
  "R",
  "RStudio",
  "Yahoo Finance Data",
  "ARIMA",
  "GARCH",
  "Time Series Analysis",
  "Econometrics",
  "ACF / PACF",
  "Augmented Dickey-Fuller Test",
  "Ljung-Box Test",
  "Shapiro-Wilk Test",
  "Breusch-Pagan Test",
  "Residual Diagnostics",
  "Volatility Analysis",
  "Financial Crime Risk Research",
  "Virtual Asset Risk",
];

const ANALYTICAL_FLOW = [
  "Historical market data",
  "Time-series exploration",
  "ARIMA forecasting",
  "Residual diagnostics",
  "Heteroscedasticity identified",
  "GARCH volatility model",
  "Risk interpretation",
];

const ARIMA_FLOW = ["Data", "Stationarity", "ACF / PACF", "ARIMA(2,0,2)", "Forecast"];

const VIRTUAL_ECONOMY: { label: string; text: string }[] = [
  { label: "Digital & Virtual Currencies", text: "How value is issued and held inside a platform that isn't a bank." },
  { label: "Virtual Marketplaces", text: "Where digital assets are listed, priced and traded." },
  { label: "Supply & Demand", text: "The same forces, applied to a fixed-supply virtual land and token." },
  { label: "Digital Assets", text: "MANA and the parcels of virtual land it's used to buy." },
  { label: "User Behaviour", text: "How participants actually act inside a virtual economy, not just how they're modelled to." },
  { label: "Game-Theory Applications", text: "The incentives participants respond to when the rules are written in code." },
];

const CRIME_RISKS: { id: string; label: string; text: string }[] = [
  { id: "RISK_01", label: "Crypto Theft", text: "Unauthorized theft of cryptocurrency from exchanges or digital environments." },
  { id: "RISK_02", label: "Fake NFT Activity", text: "Trading of fake NFTs and deceptive virtual assets." },
  { id: "RISK_03", label: "Black-Market Transactions", text: "Transactions taking place outside platform rules, including activity designed to avoid fees or taxes." },
  { id: "RISK_04", label: "Monitoring & Regulation", text: "The need for stronger monitoring, user protection and regulatory oversight in emerging virtual economies." },
];

const DIAGNOSTICS: { test: string; checks: string }[] = [
  { test: "Shapiro-Wilk", checks: "Normality of the ARIMA residuals" },
  { test: "Ljung-Box", checks: "Autocorrelation left in the residuals" },
  { test: "Breusch-Pagan", checks: "Heteroscedasticity: non-constant residual variance" },
];

function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-paper relative border-t border-black/10 py-20 sm:py-24 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-burgundy font-mono text-xs font-semibold tracking-[0.28em] uppercase">
      {children}
    </p>
  );
}

function ExhibitTag({ label }: { label: string }) {
  return (
    <span className="border-burgundy/50 text-burgundy/80 inline-block rounded-sm border px-2 py-1 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
      {label}
    </span>
  );
}

function MiniFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2.5">
          <span
            className={`rounded-sm border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.1em] uppercase ${i === steps.length - 1
                ? "bg-burgundy border-burgundy text-white"
                : "border-black/15 text-black/70"
              }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-burgundy/50 text-xs">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

type Figure = {
  exhibit: string;
  src: string;
  width: number;
  height: number;
  title: string;
  captionLabel: string;
  captionText: string;
  dark?: boolean;
};

const FIGURES = {
  price: {
    exhibit: "Exhibit A",
    src: "/projects/metaverse-mana/mana-price-history.png",
    width: 611,
    height: 385,
    title: "MANA price evolution",
    captionLabel: "Historical MANA Price",
    captionText: "Historical MANA-USD price evolution used for the time-series analysis.",
  },
  trend: {
    exhibit: "Exhibit B",
    src: "/projects/metaverse-mana/mana-trend.png",
    width: 534,
    height: 100,
    title: "Trend test",
    captionLabel: "Trend Regression",
    captionText: "Linear regression of the series against time, used to test for a deterministic trend.",
    dark: true,
  },
  seasonality: {
    exhibit: "Exhibit C",
    src: "/projects/metaverse-mana/mana-seasonal-decomposition.png",
    width: 611,
    height: 397,
    title: "Trend / seasonality",
    captionLabel: "Seasonal Decomposition",
    captionText: "Observed series decomposed into trend, seasonal and random components.",
  },
  acf: {
    exhibit: "Exhibit D",
    src: "/projects/metaverse-mana/arima-acf.png",
    width: 611,
    height: 397,
    title: "ACF",
    captionLabel: "Autocorrelation",
    captionText: "Autocorrelation function of the differenced MANA series.",
  },
  pacf: {
    exhibit: "Exhibit E",
    src: "/projects/metaverse-mana/arima-pacf.png",
    width: 611,
    height: 397,
    title: "PACF",
    captionLabel: "Partial Autocorrelation",
    captionText: "Partial autocorrelation used to help identify the ARIMA order.",
  },
  arimaModel: {
    exhibit: "Exhibit F",
    src: "/projects/metaverse-mana/arima-model.png",
    width: 661,
    height: 184,
    title: "Fitted model",
    captionLabel: "ARIMA(2,0,2)",
    captionText: "Coefficient estimates for the fitted ARIMA(2,0,2) model.",
    dark: true,
  },
  forecast: {
    exhibit: "Exhibit G",
    src: "/projects/metaverse-mana/arima-forecast-2024.png",
    width: 611,
    height: 397,
    title: "ARIMA forecast",
    captionLabel: "2024 Forecast",
    captionText: "ARIMA(2,0,2) forecast of MANA's average price for 2024.",
  },
  returns: {
    exhibit: "Exhibit H",
    src: "/projects/metaverse-mana/mana-returns.png",
    width: 611,
    height: 385,
    title: "Returns series",
    captionLabel: "Volatility Clustering",
    captionText: "MANA's return series, showing the volatility clustering an ARIMA model can't capture.",
  },
  garchResiduals: {
    exhibit: "Exhibit I",
    src: "/projects/metaverse-mana/garch-residual-diagnostics.png",
    width: 611,
    height: 410,
    title: "GARCH diagnostics",
    captionLabel: "Residual Diagnostics",
    captionText: "Standardised GARCH residuals and their distribution, used to validate the volatility model.",
  },
} satisfies Record<string, Figure>;

function ChartExhibit({ figure }: { figure: Figure }) {
  return (
    <div className="bg-paper-card shadow-paper-sm h-full border border-black/10 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
          {figure.title}
        </p>
        <ExhibitTag label={figure.exhibit} />
      </div>

      <div className={`mt-4 flex justify-center ${figure.dark ? "bg-[#1c1c1c] p-3" : ""}`}>
        <Image
          src={figure.src}
          alt={figure.captionText}
          width={figure.width}
          height={figure.height}
          className="h-auto w-full"
        />
      </div>

      <div className="mt-4 border-t border-black/10 pt-3">
        <p className="text-ink font-mono text-[11px] font-bold tracking-[0.06em] uppercase">
          {figure.captionLabel}
        </p>
        <p className="mt-1 text-[12px] leading-[1.6] text-black/55">
          {figure.captionText}
        </p>
      </div>

      <p className="mt-3 font-mono text-[9px] tracking-[0.14em] text-black/35 uppercase">
        Source: Thesis analysis · R
      </p>
    </div>
  );
}

export default function MetaverseEconomyManaForecastingPage() {
  return (
    <main className="bg-paper min-h-screen overflow-x-hidden text-ink">
      <Link
        href="/#projects"
        className="bg-ivory/90 fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-black/60 uppercase backdrop-blur-md transition hover:border-burgundy/30 hover:text-burgundy"
      >
        ← Back
      </Link>

      {/* HERO — THE QUESTION */}
      <section className="bg-paper relative overflow-hidden py-28 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
          <Reveal onLoad>
            <CaseTab tone="manila" onLoad>
              Case Study / Bachelor Thesis
            </CaseTab>
          </Reveal>

          <Reveal onLoad delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              Metaverse Economy, Crypto Forecasting &amp; Financial Crime
              Risks
            </h1>
          </Reveal>

          <Reveal onLoad delay={0.18}>
            <p className="text-burgundy mt-5 font-mono text-xs font-semibold tracking-[0.24em] uppercase">
              Time Series Analysis · Econometrics · Virtual Economies ·
              Financial Crime
            </p>
          </Reveal>

          <Reveal onLoad delay={0.26}>
            <div className="mt-10 max-w-2xl border-t border-black/10 pt-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
                The Question
              </p>
              <p className="font-serif text-ink/90 mt-3 text-2xl leading-[1.4] italic sm:text-3xl">
                How can traditional economic and quantitative methods be
                applied to a digital economy and what risks emerge when
                financial activity moves into virtual environments?
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIRTUAL ECONOMY */}
      <Section>
        <Reveal>
          <Eyebrow>Virtual Economy</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            A market inside a market
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/60">
            Using Decentraland and its native cryptocurrency, MANA, as a
            case study for the mechanics of an emerging digital economy.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VIRTUAL_ECONOMY.map((item, i) => (
            <Reveal key={item.label} delay={0.05 + i * 0.06}>
              <p className="font-mono text-xs text-black/35">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-lg leading-tight">
                {item.label}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/55">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FINANCIAL CYBERCRIME & FRAUD-RELATED RISKS */}
      <Section>
        <Reveal>
          <Eyebrow>Virtual Asset Risk</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Financial Cybercrime &amp; Fraud-Related Risks
          </h2>
          <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-black/45 italic">
            Qualitative risk research from the thesis, not a dedicated
            fraud-detection or AML transaction-monitoring project, and
            separate from the ARIMA/GARCH modelling work.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12 lg:grid lg:grid-cols-[0.34fr_0.66fr] lg:items-start lg:gap-x-14">
          <Reveal delay={0.05}>
            <p className="text-burgundy/70 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
              Case Note
            </p>
            <p className="mt-3 max-w-sm text-base leading-7 text-black/60">
              Alongside the quantitative analysis, the thesis also examined
              financial cybercrime and illicit activity in virtual
              economies.
            </p>
          </Reveal>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {CRIME_RISKS.map((item, i) => (
              <Reveal key={item.id} delay={0.1 + i * 0.08}>
                <div className="bg-paper-card shadow-paper-xs h-full border border-black/10 p-6">
                  <p className="text-burgundy/70 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
                    {item.id}
                  </p>
                  <p className="text-ink mt-2 font-mono text-[13px] font-bold tracking-tight">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.7] text-black/55">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} className="mt-12">
          <div className="border-l-2 border-burgundy/40 bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-t-black/10 border-r-black/10 border-b-black/10 max-w-2xl px-5 py-4">
            <p className="text-burgundy/70 mb-1.5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
              Red Flag
            </p>
            <p className="text-[13px] leading-[1.7] text-black/65">
              Virtual economies create new opportunities for financial
              activity, but they also introduce new forms of financial
              cybercrime and fraud-related risk that require monitoring,
              controls and regulatory attention.
            </p>
          </div>
        </Reveal>

        <InvestigationAnnotation className="mt-10" rotate={-2} delay={0.4}>
          the same environment that makes forecasting hard also makes
          oversight hard
        </InvestigationAnnotation>

        <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-black/35 uppercase">
          Thesis Research · Financial Cybercrime in Virtual Economies
        </p>
      </Section>

      {/* DATA & TIME SERIES */}
      <Section>
        <Reveal>
          <Eyebrow>Time Series</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Reading MANA as a financial series
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <BriefItem index="01" label="Data" delay={0.05}>
            Historical MANA-USD data, collected in R via Yahoo Finance.
          </BriefItem>
          <BriefItem index="02" label="Trend" delay={0.12}>
            The series&apos; direction over the observed period.
          </BriefItem>
          <BriefItem index="03" label="Seasonality" delay={0.19}>
            Recurring patterns, checked before assuming any structure.
          </BriefItem>
          <BriefItem index="04" label="Stationarity" delay={0.26}>
            Tested with the Augmented Dickey-Fuller test before modelling.
          </BriefItem>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          <ChartExhibit figure={FIGURES.price} />
          <ChartExhibit figure={FIGURES.trend} />
          <ChartExhibit figure={FIGURES.seasonality} />
        </div>
      </Section>

      {/* ARIMA MODEL */}
      <Section>
        <Reveal>
          <Eyebrow>Forecasting Model</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Building the ARIMA model
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <MiniFlow steps={ARIMA_FLOW} />
        </Reveal>

        <Reveal delay={0.14} className="mt-10 max-w-2xl">
          <p className="text-base leading-7 text-black/60">
            Autocorrelation was read from the series&apos; ACF / PACF
            profile, then an ARIMA(2,0,2) model was fitted to forecast
            MANA&apos;s price evolution.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <ChartExhibit figure={FIGURES.acf} />
          <ChartExhibit figure={FIGURES.pacf} />
          <ChartExhibit figure={FIGURES.arimaModel} />
          <ChartExhibit figure={FIGURES.forecast} />
        </div>
      </Section>

      {/* MODEL DIAGNOSTICS */}
      <Section>
        <Reveal>
          <Eyebrow>Model Diagnostics</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Where the model started to strain
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/60">
            The ARIMA model wasn&apos;t taken at face value. Its residuals
            were checked against their own assumptions.
          </p>
        </Reveal>

        <dl className="divide-black/[0.08] border-black/[0.08] mt-12 max-w-2xl divide-y border-t font-mono text-[12px]">
          {DIAGNOSTICS.map((d, i) => (
            <Reveal key={d.test} delay={0.05 + i * 0.08}>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <dt className="text-ink font-semibold">{d.test}</dt>
                <dd className="max-w-[22ch] text-black/55 sm:text-right">
                  {d.checks}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.2} className="mt-10 max-w-2xl">
          <div className="border-l-2 border-burgundy/40 bg-ivory-deep/60 shadow-paper-xs border-t border-r border-b border-t-black/10 border-r-black/10 border-b-black/10 px-5 py-4">
            <p className="text-burgundy/70 mb-1.5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
              Finding
            </p>
            <p className="text-[13px] leading-[1.7] text-black/65">
              The Breusch-Pagan test revealed heteroscedasticity in the
              residuals: a limitation of the ARIMA model that motivated
              the next step.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* GARCH VOLATILITY ANALYSIS */}
      <Section>
        <Reveal>
          <Eyebrow>Volatility Analysis</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            Modelling the risk ARIMA couldn&apos;t see
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/60">
            A GARCH model was added specifically to analyse and forecast
            that changing volatility, reading risk, not just price.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
            Analytical flow
          </p>
          <div className="mt-4">
            <MiniFlow steps={ANALYTICAL_FLOW} />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <ChartExhibit figure={FIGURES.returns} />
          <ChartExhibit figure={FIGURES.garchResiduals} />
        </div>
      </Section>

      {/* KEY TAKEAWAY */}
      <Section>
        <Reveal>
          <p className="text-burgundy text-center font-mono text-xs font-semibold tracking-[0.28em] uppercase">
            Key Finding
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-2xl leading-[1.4] sm:text-3xl">
            This project combined economic research, financial data
            analysis, forecasting, statistical testing, model validation
            and risk analysis, not just a cryptocurrency price
            prediction.
          </p>
        </Reveal>
      </Section>

      {/* ANALYTICAL WORKFLOW (recap) */}
      <InvestigationWorkflow
        eyebrow="Analytical Workflow"
        title="How the two threads connect"
        steps={ANALYTICAL_FLOW}
        description="Quantitative forecasting and financial-crime risk research approached the same emerging economy from two different angles — one modelling its price behaviour, the other its exposure."
        annotation="the model that failed said the most"
      />

      {/* TOOLS / TAGS */}
      <Section>
        <Reveal>
          <Eyebrow>Tools &amp; Methods</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.1] sm:text-4xl">
            What went into it
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-black/15 px-3 py-1.5 font-mono text-xs text-black/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <PinnedNote variant="mini" rotate={-2} className="max-w-md">
            <span className="font-hand text-ink/85 text-xl leading-snug">
              &ldquo;the forecast held. the variance and the oversight
              didn&apos;t.&rdquo;
            </span>
          </PinnedNote>
        </Reveal>

        <MarginNote className="mt-10" rotate={2} delay={0.3}>
          forecast the level, model the risk, question the oversight
        </MarginNote>
      </Section>

      {/* CLOSING */}
      <section className="bg-paper relative overflow-hidden border-t border-black/10 py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="relative mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-black/40 uppercase">
            Case Study / Bachelor Thesis
          </p>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-burgundy"
          >
            Back to all cases
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
