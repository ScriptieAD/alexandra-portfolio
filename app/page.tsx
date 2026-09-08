"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Reveal from "./components/Reveal";
import ProjectsSection from "./components/ProjectsSection";

const CASE_FILE_HREF = "/projects/aml-transaction-monitoring";

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
            <a href="#projects" className="transition hover:opacity-50">
              Projects
            </a>

            <a href="#experience" className="transition hover:opacity-50">
              Experience
            </a>

            <Link href="/about" className="transition hover:opacity-50">
              About
            </Link>

            <a href="#contact" className="transition hover:opacity-50">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-burgundy px-5 py-2.5 text-xs font-medium text-white transition hover:bg-burgundy-dark"
          >
            Let&apos;s connect
          </a>
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
      <section
        id="about"
        className="mx-auto max-w-[1400px] px-6 py-28 md:px-10"
      >
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
                My background sits at the intersection of data, business and
                technology. I enjoy understanding how systems behave,
                identifying patterns and turning complex information into
                solutions that are clear and useful.
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
                I&apos;m currently developing deeper expertise in financial
                crime, fraud analytics and transaction monitoring through
                practical projects and continuous learning.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-burgundy"
              >
                More about me
                <span>→</span>
              </Link>
            </div>

          </div>
        </Reveal>

        {/* SKILLS */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 md:grid-cols-4">

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
            ].map((skill) => (
              <div
                key={skill.title}
                className="bg-paper-card p-7"
              >
                <p className="font-serif text-2xl">{skill.title}</p>

                <p className="mt-3 text-sm leading-6 text-black/50">
                  {skill.text}
                </p>
              </div>
            ))}

          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="bg-paper-dark border-t border-black/10 py-28 text-white"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">

          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
              Experience
            </p>

            <h2 className="mt-5 font-serif text-5xl">
              Where data meets business.
            </h2>
          </Reveal>

          <div className="mt-16 divide-y divide-white/10">

            <Reveal>
              <div className="grid gap-5 py-8 md:grid-cols-[1fr_1fr_2fr]">
                <p className="text-sm text-white/40">
                  Current
                </p>

                <div>
                  <p className="font-medium">Global Records</p>
                  <p className="mt-1 text-sm text-white/40">
                    Data & Analytics
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-white/55">
                  Financial and market data analysis, reporting automation,
                  dashboards, APIs, SQL databases and analytical workflows.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="grid gap-5 py-8 md:grid-cols-[1fr_1fr_2fr]">
                <p className="text-sm text-white/40">
                  Previous
                </p>

                <div>
                  <p className="font-medium">
                    Business Analyst
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Software & Public Systems
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-white/55">
                  Application analysis, test cases, feature validation,
                  deployments and collaboration across technical teams.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid gap-5 py-8 md:grid-cols-[1fr_1fr_2fr]">
                <p className="text-sm text-white/40">
                  Previous
                </p>

                <div>
                  <p className="font-medium">
                    Alpha Bank
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Digital Channels
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-white/55">
                  Financial reporting, digital banking operations,
                  issue monitoring and stakeholder collaboration.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer
        id="contact"
        className="bg-velvet text-white"
      >
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">

          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Contact
          </p>

          <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <h2 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
              Let&apos;s build something
              meaningful with data.
            </h2>

            <a
              href="mailto:your@email.com"
              className="w-fit rounded-full bg-white px-7 py-3.5 text-sm font-medium text-burgundy transition hover:-translate-y-1"
            >
              Email me
            </a>

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
