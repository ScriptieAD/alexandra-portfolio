import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";
import PhotoStickers from "../components/PhotoStickers";
import SkillsHeading from "../components/SkillsHeading";
import FocusAreaCard, { type FocusArea } from "../components/FocusAreaCard";
import { experiences } from "./experiences-data";

const focusAreas: FocusArea[] = [
    {
        number: "01",
        title: "Data",
        description:
            "Finding patterns, asking better questions and turning complexity into something useful.",
        variant: "dark",
        span: "lg:col-span-7",
        microLine: "pattern > assumption",
    },
    {
        number: "02",
        title: "Financial Crime",
        description:
            "Transaction monitoring, suspicious behaviour and investigative analytics.",
        variant: "burgundy",
        span: "lg:col-span-5",
        microLine: "new territory, built on purpose ↓",
        badge: "Currently exploring",
    },
    {
        number: "03",
        title: "Technology",
        description:
            "Building tools, automation, databases and understanding how systems work.",
        variant: "ivory",
        span: "lg:col-span-5",
        microLine: "if I can automate it, I probably will",
    },
    {
        number: "04",
        title: "Curiosity",
        description:
            "Learning by building, testing ideas and understanding why something happens.",
        variant: "ivory",
        span: "lg:col-span-7",
        microLine: "why? → test → break → learn",
    },
];

const skillGroups = [
    { title: "Data", items: ["Python", "SQL", "Pandas", "Analytics"] },
    { title: "Technology", items: ["JavaScript", "React", "APIs", "Supabase"] },
    { title: "Risk", items: ["Fraud", "AML", "Transaction Monitoring"] },
    { title: "Business", items: ["Reporting", "Testing", "Requirements"] },
];

export default function AboutPage() {
    return (
        <main className="bg-paper-quiet min-h-screen overflow-x-hidden text-ink">

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-black/10 bg-ivory/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">

                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 font-serif text-lg">
                            AC
                        </div>

                        <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:block">
                            Alexandra Crăciunescu
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 text-sm md:flex">
                        <Link href="/" className="transition hover:opacity-50">
                            Home
                        </Link>

                        <Link href="/#projects" className="transition hover:opacity-50">
                            Projects
                        </Link>

                        <Link href="/about" className="font-medium text-burgundy">
                            About
                        </Link>

                        <Link href="/#experience" className="transition hover:opacity-50">
                            Experience
                        </Link>

                        <Link href="/#contact" className="transition hover:opacity-50">
                            Contact
                        </Link>
                    </div>

                    <Link
                        href="/#contact"
                        className="rounded-full bg-ink px-5 py-2.5 text-xs font-medium text-white transition hover:bg-burgundy"
                    >
                        Let&apos;s connect
                    </Link>
                </div>
            </nav>

            {/* ABOUT HERO */}
            <section className="bg-hero-hearts relative overflow-hidden pb-16 pt-14 md:pb-20 md:pt-20">
                <div className="mx-auto max-w-[1400px] px-6 md:px-10">

                <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

                    {/* PHOTO */}
                    <Reveal onLoad>
                        <div className="relative">
                            <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#ded8ce]">

                                <Image
                                    src="/about-me.png"
                                    alt="Alexandra Crăciunescu"
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />

                            </div>

                            <PhotoStickers />

                            <div className="bg-velvet absolute -bottom-5 -right-4 max-w-[190px] rounded-2xl border border-white/10 px-5 py-4 text-white shadow-lg backdrop-blur-sm md:-right-6">
                                <p className="text-[9px] uppercase tracking-[0.22em] text-white/75">
                                    Current focus
                                </p>

                                <p className="mt-1.5 font-serif text-lg leading-tight">
                                    Financial Crime
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-black/50">
                            <span>Data</span>
                            <span className="text-black/30">/</span>
                            <span>Financial Crime</span>
                            <span className="text-black/30">/</span>
                            <span>Technology</span>
                        </div>
                    </Reveal>

                    {/* TEXT */}
                    <div>

                        <Reveal onLoad>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-burgundy">
                                About me
                            </p>

                            <h1 className="mt-5 max-w-2xl text-pretty font-serif text-[clamp(2.25rem,1rem+4.4vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
                                Data but make it creative.
                                <br />
                                <span className="text-burgundy">
                                    Curious by default.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal onLoad delay={0.1}>
                            <div className="mt-8 max-w-xl space-y-4 text-lg leading-8 text-black/65">
                                <p>
                                    I&apos;m drawn to messy datasets, unexpected patterns, and
                                    questions that don&apos;t have obvious answers.
                                </p>

                                <p>
                                    I&apos;m now building on that experience through practical
                                    financial crime and transaction-monitoring projects.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal onLoad delay={0.16}>
                            <div className="group mt-8 max-w-lg rounded-2xl border border-black/10 bg-white/50 px-6 py-5 transition-colors duration-300 hover:border-burgundy/30">
                                <p className="font-serif text-base italic leading-relaxed text-black/55 transition-colors duration-300 group-hover:text-black/70">
                                    &ldquo;The truth&hellip; is always curious and beautiful to seekers after it.&rdquo;
                                </p>
                                <p className="mt-2 text-[11px] not-italic uppercase tracking-[0.18em] text-black/45 transition-colors duration-300 group-hover:text-black/60">
                                    — Agatha Christie
                                </p>

                                <div className="mt-4 border-t border-black/10 pt-4">
                                    <p className="text-pretty font-serif text-xl leading-snug sm:text-2xl">
                                        I&apos;m interested in the detail that{" "}
                                        <span className="text-burgundy">doesn&apos;t quite fit.</span>
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                    </div>

                </div>
                </div>
            </section>

            {/* WHAT I BRING */}
            <section className="bg-paper-quiet-deep border-b border-black/10 py-24">
                <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">

                    <Reveal>
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                                How I make sense of things
                            </p>

                            <SkillsHeading />

                            <p className="mt-6 max-w-md leading-7 text-black/60">
                                The things I&apos;m curious about right now, and getting better at on purpose.
                            </p>
                        </div>
                    </Reveal>

                    {/* MARGIN NOTE */}
                    <div className="pointer-events-none absolute right-10 top-1 hidden max-w-[190px] -rotate-2 select-none xl:block">
                        <p className="font-serif text-base italic text-black/50">
                            currently curious about:
                        </p>

                        <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-tight text-black/45">
                            patterns / fraud / systems / why things break
                        </p>

                        <svg
                            viewBox="0 0 100 210"
                            className="ml-6 mt-2 h-52 w-16 text-black/25"
                            fill="none"
                        >
                            <path
                                d="M16 6 C 0 48, 58 68, 38 120 C 24 156, 58 168, 58 198"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M48 189 L59 200 L67 186"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* CARDS */}
                    <div className="mt-14 grid gap-4 lg:grid-cols-12">

                        {focusAreas.map((item, index) => (
                            <Reveal
                                key={item.number}
                                delay={index * 0.1}
                                className={item.span}
                            >
                                <FocusAreaCard item={item} index={index} />
                            </Reveal>
                        ))}

                    </div>
                </div>
            </section>

            {/* BACKGROUND — TIMELINE */}
            <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">

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
            </section>

            {/* TOOLKIT */}
            <section className="bg-paper-dark py-24 text-white">

                <div className="mx-auto max-w-[1400px] px-6 md:px-10">

                    <Reveal>
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                                Toolkit
                            </p>

                            <h2 className="mt-5 font-serif text-5xl">
                                Things I work
                                <br />
                                with.
                            </h2>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">

                        {skillGroups.map((group, index) => (
                            <Reveal key={group.title} delay={index * 0.06}>
                                <div className="bg-paper-dark h-full p-8">
                                    <p className="font-serif text-2xl">{group.title}</p>

                                    <ul className="mt-5 space-y-2">
                                        {group.items.map((item) => (
                                            <li
                                                key={item}
                                                className="text-sm leading-6 text-white/75"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}

                    </div>
                </div>
            </section>

            {/* OFF SCREEN */}
            <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-burgundy">
                        Off screen
                    </p>

                    <p className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
                        Art. Music. Books. Travel.{" "}
                        <span className="text-burgundy">Curiosity.</span>
                    </p>
                </Reveal>
            </section>

            {/* CURRENT DIRECTION */}
            <section id="whats-next" className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
                <Reveal>
                    <div className="bg-velvet overflow-hidden rounded-[32px] text-white">

                        <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">

                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-white/65">
                                    What&apos;s next
                                </p>

                                <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.05] md:text-6xl">
                                    Building toward
                                    financial crime analytics.
                                </h2>

                                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">
                                    I&apos;m developing practical experience through transaction
                                    monitoring, fraud detection and risk-analysis projects while
                                    deepening my understanding of AML and financial crime.
                                </p>
                            </div>

                            <div className="flex items-end lg:justify-end">

                                <Link
                                    href="/#projects"
                                    className="rounded-full bg-white px-7 py-4 text-sm font-medium text-burgundy transition hover:-translate-y-1 motion-reduce:transition-colors motion-reduce:hover:translate-y-0"
                                >
                                    Explore my projects →
                                </Link>

                            </div>

                        </div>
                    </div>
                </Reveal>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-black/10">
                <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-6 py-10 text-xs text-black/55 sm:flex-row md:px-10">

                    <p>Alexandra Crăciunescu</p>

                    <p>
                        Data · Financial Crime · Technology
                    </p>

                    <p>© 2026</p>

                </div>
            </footer>

        </main>
    );
}
