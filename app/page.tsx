"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./components/Reveal";
import ProjectsSection from "./components/ProjectsSection";

const CASE_FILE_HREF = "/projects/aml-transaction-monitoring";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="group relative inline-block py-1">
      {children}
      <span
        aria-hidden="true"
        className="bg-burgundy absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
}

function EditorialCta({
  href,
  children,
  tone = "burgundy",
}: {
  href: string;
  children: ReactNode;
  tone?: "burgundy" | "cream";
}) {
  const underline = tone === "burgundy" ? "bg-burgundy-dark" : "bg-white";
  const textColor =
    tone === "burgundy"
      ? "text-burgundy hover:text-burgundy-dark"
      : "text-white hover:text-white/80";

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${textColor}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        ↗
      </span>
      <span
        aria-hidden="true"
        className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${underline}`}
      />
    </a>
  );
}

export default function Home() {
  const router = useRouter();

  function handleOpenCase() {
    router.push(CASE_FILE_HREF);
  }

  return (
    <main className="bg-paper min-h-screen overflow-x-clip text-ink">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">

          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 font-serif text-lg">
              AC
            </div>

            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:block">
              Alexandra Crăciunescu
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <EditorialCta href="#contact">Let&apos;s connect</EditorialCta>
        </div>
      </nav>

      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-paper-quiet-deep border-y border-black/10 pt-12 pb-24 md:pt-16 md:pb-28"
      >
        <ProjectsSection onOpenCase={handleOpenCase} />
      </section>

      {/* ABOUT / SKILLS */}
      <section id="about" className="bg-paper relative overflow-hidden py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-2">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                About
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05]">
                Analytical thinking
                with a creative edge.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-black/60">
                My background combines data, business and technology. I
                enjoy understanding how systems work, spotting patterns and
                turning complex information into practical, clear solutions.
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
                More recently, I&apos;ve been focusing on financial crime,
                fraud analytics and transaction monitoring, building
                hands-on projects to better understand how data can be used
                to detect unusual behaviour and support real-world
                investigations.
              </p>

              <Link
                href="/about"
                className="group relative mt-8 inline-flex items-center gap-2.5 text-sm font-semibold text-burgundy"
              >
                More about me
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
                <span
                  aria-hidden="true"
                  className="bg-burgundy-dark absolute -bottom-1 left-0 h-px w-[calc(100%-14px)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            </div>

          </div>
        </Reveal>

        {/* SKILLS */}
        <Reveal delay={0.1}>
          <div className="mt-24 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Data",
                text: "Python · Pandas · SQL · Analytics",
              },
              {
                title: "Technology",
                text: "JavaScript · React · APIs · Supabase",
              },
              {
                title: "Risk",
                text: "Fraud · AML · Transaction Monitoring",
              },
              {
                title: "Business",
                text: "Reporting · Testing · Requirements",
              },
            ].map((skill, i) => (
              <div key={skill.title} className="relative">
                <span
                  aria-hidden="true"
                  className="block h-px w-full origin-left bg-black/15"
                />
                <div className="pt-6">
                  <p className="text-burgundy/70 font-mono text-[10px] tracking-[0.22em] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-serif text-2xl">{skill.title}</p>
                  <p className="mt-3 text-sm leading-6 text-black/50">
                    {skill.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="bg-paper-dark relative overflow-hidden border-t border-black/10 py-28 text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">

          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
              Experience
            </p>

            <h2 className="mt-5 font-serif text-5xl">
              Where data meets business.
            </h2>
          </Reveal>

          <div className="mt-16 divide-y divide-white/10">

            {[
              {
                status: "Current",
                role: "Global Records",
                domain: "Data & Analytics",
                text: "Financial and market data analysis, reporting automation, dashboards, APIs, SQL databases and analytical workflows.",
              },
              {
                status: "Previous",
                role: "Business Analyst",
                domain: "Software & Public Systems",
                text: "Application analysis, test cases, feature validation, deployments and collaboration across technical teams.",
              },
              {
                status: "Previous",
                role: "Alpha Bank",
                domain: "Digital Channels",
                text: "Financial reporting, digital banking operations, issue monitoring and stakeholder collaboration.",
              },
            ].map((job, i) => (
              <Reveal key={job.role} delay={i * 0.06}>
                <div className="grid gap-5 py-8 md:grid-cols-[0.8fr_1.2fr_2fr]">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase">
                    {job.status}
                  </p>

                  <div>
                    <p className="font-serif text-xl">{job.role}</p>
                    <p className="mt-1 text-sm text-white/40">
                      {job.domain}
                    </p>
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-white/55">
                    {job.text}
                  </p>
                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer
        id="contact"
        className="bg-velvet relative overflow-hidden text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10">

          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Contact
          </p>

          <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <h2 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
              Let&apos;s build something
              meaningful with data.
            </h2>

            <EditorialCta href="mailto:your@email.com" tone="cream">
              Email me
            </EditorialCta>

          </div>

          <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/20 pt-8 text-xs text-white/50 sm:flex-row">
            <p>Alexandra Crăciunescu</p>

            <p>
              Data · Financial Crime · Technology
            </p>

            <p>© 2026</p>
          </div>

        </div>
      </footer>

    </main>
  );
}
