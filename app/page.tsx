"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import Reveal from "./components/Reveal";
import ProjectsSection from "./components/ProjectsSection";
import { experiences } from "./about/experiences-data";

const CONTACT_EMAIL = "craciunescu.alexandra77a@gmail.com";
const CONTACT_PHONE = "+40 787 446 709";
const CONTACT_PHONE_TEL = "+40787446709";

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
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: "burgundy" | "cream";
  onClick?: () => void;
}) {
  const underline = tone === "burgundy" ? "bg-burgundy-dark" : "bg-white";
  const textColor =
    tone === "burgundy"
      ? "text-burgundy hover:text-burgundy-dark"
      : "text-white hover:text-white/80";

  return (
    <a
      href={href}
      onClick={onClick}
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
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null,
  );

  function handleOpenCase() {
    document.getElementById("case-index")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleCopyContact(value: string, field: "email" | "phone") {
    // mailto:/tel: links silently do nothing on machines with no default
    // mail app or phone handler configured, so back them up with a
    // clipboard copy the visitor can paste wherever they actually need it.
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
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

      {/* EXPERIENCE — same background timeline used on /about */}
      <section id="experience" className="border-t border-black/10 py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                  Background
                </p>

                <h2 className="mt-5 font-serif text-5xl leading-[1.05]">
                  From business
                  <br />
                  to data.
                </h2>
              </div>
            </Reveal>

            <div className="relative border-l border-black/10 pl-9 sm:pl-12">

              {experiences.map((exp, index) => (
                <Reveal key={exp.company} delay={index * 0.08}>
                  <div
                    className={`relative ${index !== experiences.length - 1
                      ? "mb-14 border-b border-black/10 pb-14"
                      : ""
                      }`}
                  >
                    <span
                      className={`absolute -left-[41px] top-1.5 rounded-full sm:-left-[53px] ${exp.current
                        ? "h-3 w-3 bg-burgundy"
                        : "h-2 w-2 bg-black/25"
                        }`}
                    />

                    <Link
                      href={`/about/${exp.slug}`}
                      className="group/exp -mx-4 block rounded-2xl px-4 py-2 transition hover:bg-black/[0.03] motion-reduce:transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                          {exp.period}
                        </p>

                        {exp.current && (
                          <span className="rounded-full bg-burgundy/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-burgundy">
                            Current
                          </span>
                        )}
                      </div>

                      <h3
                        className={`mt-3 flex items-center gap-3 font-serif transition group-hover/exp:text-burgundy ${exp.current ? "text-4xl md:text-5xl" : "text-3xl"
                          }`}
                      >
                        {exp.company}

                        <span className="-translate-x-1 text-xl opacity-0 transition group-hover/exp:translate-x-0 group-hover/exp:opacity-100 motion-reduce:translate-x-0">
                          →
                        </span>
                      </h3>

                      <p className="mt-2 text-sm font-medium">
                        {exp.role}
                      </p>

                      <p className="mt-4 max-w-xl leading-7 text-black/60">
                        {exp.description}
                      </p>
                    </Link>
                  </div>
                </Reveal>
              ))}

            </div>
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

            <div className="flex flex-col items-start gap-3 md:items-end">
              <EditorialCta
                href={`mailto:${CONTACT_EMAIL}`}
                tone="cream"
                onClick={() => handleCopyContact(CONTACT_EMAIL, "email")}
              >
                Email me
              </EditorialCta>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => handleCopyContact(CONTACT_EMAIL, "email")}
                className="font-mono text-xs text-white/50 transition-colors duration-200 hover:text-white/80"
              >
                {CONTACT_EMAIL}
              </a>

              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                onClick={() => handleCopyContact(CONTACT_PHONE, "phone")}
                className="mt-2 font-mono text-xs text-white/50 transition-colors duration-200 hover:text-white/80"
              >
                {CONTACT_PHONE}
              </a>

              <p
                aria-live="polite"
                className={`font-mono text-xs text-white/70 transition-opacity duration-200 ${
                  copiedField ? "opacity-100" : "opacity-0"
                }`}
              >
                Copied to clipboard
              </p>
            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}
